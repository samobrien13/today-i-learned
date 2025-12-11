import { Metadata } from "next";
import { ReactNode } from "react";
import { ImageProps } from "next/image";

import { PLEASE_DONT_VALIDATE_MY_NAME } from "./rants/please-dont-validate-my-name";
import { HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE } from "./rants/how-to-find-and-replace-from-the-command-line";
import { DESIGN_SYSTEM } from "./rants/design-system";
import { DOTFILES } from "./rants/dotfiles";
import { HOW_TO_TELL_THE_TIME_THAI_STYLE } from "./rants/how-to-tell-the-time-thai-style";
import { WHY_AI_WONT_TAKE_YOUR_JOB } from "./rants/why-ai-wont-take-your-job";
import { HOW_TO_TEST_NEXT_JS_APP_ROUTER } from "./rants/how-to-test-next-js-app-router";
import { HOW_MUCH_TIME_THE_RBA_RATE_CUT_WILL_SAVE_YOU } from "./rants/how-much-time-the-rba-rate-cut-will-save-you";
import { HOW_TO_IMPLEMENT_DEEP_LINKS_WITH_EXPO_ROUTER } from "./rants/how-to-implement-deep-links-with-expo-router";
import { PLEASE_USE_REACT_QUERY } from "./rants/please-use-react-query";
import { THE_BEST_PULL_REQUEST_TEMPLATE } from "./rants/the-best-pull-request-template";
import { REACT_QUERY_WITH_SERVER_ACTIONS } from "./rants/react-query-with-server-actions";
import { KEYBOARD_SETUP } from "./rants/keyboard-setup";
import { CONNECT_EXPO_DEV_BUILDS_REMOTELY } from "./rants/connect-expo-dev-builds-remotely";

export type BlogData = {
    title: string;
    description: string;
    date: string;
    slug: string;
    image: ImageProps;
    tags: string[];
    component: ReactNode;
} & Metadata;

export const BLOG_ARTICLES: BlogData[] = [
    CONNECT_EXPO_DEV_BUILDS_REMOTELY,
    KEYBOARD_SETUP,
    REACT_QUERY_WITH_SERVER_ACTIONS,
    THE_BEST_PULL_REQUEST_TEMPLATE,
    PLEASE_USE_REACT_QUERY,
    HOW_TO_IMPLEMENT_DEEP_LINKS_WITH_EXPO_ROUTER,
    HOW_MUCH_TIME_THE_RBA_RATE_CUT_WILL_SAVE_YOU,
    HOW_TO_TEST_NEXT_JS_APP_ROUTER,
    WHY_AI_WONT_TAKE_YOUR_JOB,
    PLEASE_DONT_VALIDATE_MY_NAME,
    HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE,
    DESIGN_SYSTEM,
    DOTFILES,
    HOW_TO_TELL_THE_TIME_THAI_STYLE,
];
