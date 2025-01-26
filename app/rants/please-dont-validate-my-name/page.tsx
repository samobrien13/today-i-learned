import Blog, { BlogParagraph } from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { PLEASE_DONT_VALIDATE_MY_NAME } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = PLEASE_DONT_VALIDATE_MY_NAME;

function PleaseDontValidateMyName() {
    return (
        <Blog
            title={PLEASE_DONT_VALIDATE_MY_NAME.title}
            date={PLEASE_DONT_VALIDATE_MY_NAME.date}
            slug={PLEASE_DONT_VALIDATE_MY_NAME.slug}
        >
            <BlogParagraph>
                Every time I sign up for a new service, I&apos;m often
                traumatised when having to enter my name. I have a simple Irish
                last name, what could go wrong? Well, a lot.
            </BlogParagraph>
            <BlogParagraph>
                Every second website tells me I have invalid characters in my
                name! Since the internet was invented, you may no longer have an
                apostrophe in your name. When was the last time we actually
                worried about SQL injection?
            </BlogParagraph>
            <BlogParagraph>
                Perhaps more triggering, some websites try to automatically
                format your name, so I have seen the second letter of my name
                automatically lowercased.
            </BlogParagraph>
            <BlogParagraph>
                The robustness principle is best applied here: &quot;be
                conservative in what you do, be liberal in what you accept from
                others&quot;. Nothing is gained by validating names, and it
                causes a lot of frustration, so why bother?
            </BlogParagraph>
            <BlogParagraph>
                If you genuinely need to validate names for legal reasons, this
                would be covered by a KYC process. Until then let people have
                emojis in their names for all I care.
            </BlogParagraph>
            <BlogParagraph>
                If you&apos;re a designer or a product manager, please think
                about it before deciding to add arbitrary validation rules to
                your forms. It&apos;s not just names, it&apos;s anything. If
                you&apos;re not sure, ask yourself, &quot;what is the worst that
                could happen if I don&apos;t validate this?&quot;
            </BlogParagraph>
            <BlogParagraph>
                If you&apos;re a developer, this could be the hill you die on
                😂.
            </BlogParagraph>
            <BlogParagraph>
                Speaking of validation, here&apos;s the greatest{" "}
                <Link
                    href="https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript"
                    external
                >
                    stack overflow thread
                </Link>{" "}
                of all time...
            </BlogParagraph>
        </Blog>
    );
}

export default PleaseDontValidateMyName;
