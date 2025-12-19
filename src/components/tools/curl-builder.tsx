"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToolData } from ".";

function CurlBuilder({ title }: ToolData) {
    const [url, setUrl] = useState("https://api.example.com");
    const [method, setMethod] = useState("GET");
    const [headers, setHeaders] = useState("Content-Type: application/json");
    const [body, setBody] = useState(`{
    "key": "value"
}`);

    const headersArray = headers
        .split("\n")
        .map((header) => `-H '${header.trim()}' \\`)
        .join("\n\t");
    const bodyArray = body.split("\n").join("\n\t");

    const curlCommand = `curl -X ${method} '${url}' \\
    ${headersArray}
    -d '${bodyArray}'`;

    return (
        <div className="space-y-4">
            <Heading>{title}</Heading>
            <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="method">Method</Label>{" "}
                <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="headers">Headers</Label>
                <Textarea
                    id="headers"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    rows={4}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={8}
                />
            </div>
            <div className="space-y-2">
                <Label>cURL Command</Label>
                <CodeBlock language="bash">{curlCommand}</CodeBlock>
            </div>
        </div>
    );
}

export { CurlBuilder };
