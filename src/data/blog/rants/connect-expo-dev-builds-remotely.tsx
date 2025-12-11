import {
    BlogCode,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

const CONNECT_EXPO_DEV_BUILDS_REMOTELY: BlogData = {
    title: "Connect Expo dev builds remotely",
    description:
        "How to connect your Expo development build to a local development server from a remote device",
    date: "2025-12-11",
    slug: "connect-expo-dev-builds-remotely",
    tags: ["engineering", "expo"],
    image: {
        src: "/images/rants/tailscale.png",
        alt: "Tailscale",
    },
    component: <ConnectExpoDevBuildsRemotely />,
};

function ConnectExpoDevBuildsRemotely() {
    return (
        <>
            <BlogParagraph>
                Ever since I started using React Native nearly 10 years ago, I
                have been searching for the best way to develop and debug. I
                have most commonly used the iOS simulator, but over the years it
                has been incredibly buggy. It always breaks after macOS upgrades
                and there is still a bug where you need to force quit it every
                time just to restart your computer.
            </BlogParagraph>
            <BlogParagraph>
                As an Android user I shifted to using my own device and using
                adb reverse to connect to my local development server via USB.
                This sort of works but is annoying to set up and takes up a
                valuable USB slot. You also need to reverse the ports of any
                local APIs you are developing against.
            </BlogParagraph>
            <BlogParagraph>
                I started searching for solutions, and found that Expo is
                supposed to work over LAN by default. However if you are on a
                work computer chances are you don&apos;t have access to your
                firewall to allow this traffic. Beyond this there aren&apos;t
                many documented solutions.
            </BlogParagraph>
            <BlogParagraph>
                I then had the thought that{" "}
                <Link href="https://tailscale.com/" external>
                    Tailscale
                </Link>{" "}
                could be a good option to allow secure connection between your
                device and your local development server.
            </BlogParagraph>
            <BlogParagraph>Here&apos;s how it works:</BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>
                    Install{" "}
                    <Link href="https://tailscale.com/" external>
                        Tailscale
                    </Link>{" "}
                    on both your computer running Expo and the device(s) you
                    want to use
                </BlogListItem>
                <BlogListItem>
                    Create a Tailscale account and create a new tailnet
                </BlogListItem>
                <BlogListItem>
                    Connect both devices to the same tailnet
                </BlogListItem>
                <BlogListItem>
                    Install your expo development build app on your device
                </BlogListItem>
                <BlogListItem>
                    Run the development server on your computer using the usual{" "}
                    <BlogCode>expo start</BlogCode> command
                </BlogListItem>
                <BlogListItem>
                    Run{" "}
                    <BlogCode>
                        tailscale serve --https=8081 localhost:8081
                    </BlogCode>{" "}
                    and copy the url output (https is required for iOS)
                </BlogListItem>
                <BlogListItem>
                    Open the expo development build app on your device and paste
                    the url to connect
                </BlogListItem>
            </BlogUnorderedList>
            <BlogParagraph>
                If you also have a local backend API you can expose these via
                the same serve command as well. You can then change the
                environment variables in your expo app to point to your
                tailscale url instead of localhost.
            </BlogParagraph>
            <BlogParagraph>
                You can add these commands to your{" "}
                <BlogCode>package.json</BlogCode> scripts to make it easier to
                run them.
            </BlogParagraph>
            <BlogParagraph>
                This method is also useful for connecting to local web servers
                from a real device.
            </BlogParagraph>
            <BlogParagraph>
                That&apos;s it! You should now be loading the code from your
                development server on your device.
            </BlogParagraph>
        </>
    );
}
export { CONNECT_EXPO_DEV_BUILDS_REMOTELY };
