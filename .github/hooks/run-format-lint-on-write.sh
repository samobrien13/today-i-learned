#!/usr/bin/env bash
set -euo pipefail

INPUT_JSON="$(cat)"

TOOL_NAME="$(printf '%s' "$INPUT_JSON" | python3 -c '
import json
import sys

try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError:
    print("")
    raise SystemExit(0)

print(payload.get("toolName", ""))
')"

WRITTEN_PATHS="$(printf '%s' "$INPUT_JSON" | python3 -c '
import json
import re
import sys

def add_path(collection, value):
    if isinstance(value, str) and value.strip():
        collection.append(value.strip())

try:
    payload = json.load(sys.stdin)
except json.JSONDecodeError:
    raise SystemExit(0)

tool_name = payload.get("toolName", "")
tool_args_raw = payload.get("toolArgs", "{}")

if isinstance(tool_args_raw, str):
    try:
        tool_args = json.loads(tool_args_raw)
    except json.JSONDecodeError:
        tool_args = {}
elif isinstance(tool_args_raw, dict):
    tool_args = tool_args_raw
else:
    tool_args = {}

paths = []

if tool_name in {"edit", "create", "multi_edit", "notebook_edit_cell"}:
    for key in ("path", "filePath", "filepath"):
        add_path(paths, tool_args.get(key))
elif tool_name == "apply_patch":
    patch = tool_args.get("patch", "")
    for match in re.finditer(r"^\\*\\*\\* (?:Add|Update|Delete) File: (.+)$", patch, re.MULTILINE):
        add_path(paths, match.group(1))

seen = set()
for path in paths:
    if path not in seen:
        seen.add(path)
        print(path)
')"

case "$TOOL_NAME" in
  edit|create|apply_patch|multi_edit|notebook_edit_cell)
    while IFS= read -r path; do
      [ -n "$path" ] || continue
      [ -f "$path" ] || continue

      pnpm exec prettier --write --ignore-unknown "$path"

      case "$path" in
        *.js|*.jsx|*.ts|*.tsx|*.mjs|*.cjs|*.mts|*.cts)
          pnpm exec eslint "$path"
          ;;
      esac
    done <<< "$WRITTEN_PATHS"
    ;;
esac
