import {
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

const HOW_TO_REMOTELY_CONNECT_AN_EXPO_DEVELOPMENT_BUILD_TO_YOUR_LOCAL_DEV_SERVER: BlogData =
    {
        title: "How to remotely connect an Expo development build to your local dev server",
        description:
            "A guide on connecting your Expo development build to a local development server, even when debugging remotely.",
        date: "2025-12-11",
        slug: "how-to-remotely-connect-an-expo-development-build-to-your-local-dev-server",
        tags: ["engineering", "expo"],
        image: {
            src: "/images/rants/tailscale.png",
            alt: "Tailscale",
        },
        component: (
            <HowToRemotelyConnectAnExpoDevelopmentBuildToYourLocalDevServer />
        ),
    };

function HowToRemotelyConnectAnExpoDevelopmentBuildToYourLocalDevServer() {
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
                I started searching for solutions, seeing that Expo is supposed
                to work over LAN, however if you are on a work computer chances
                are you don&apos;t have access to your firewall to allow this
                traffic. Beyond this there aren&apos;t many documented
                solutions.
            </BlogParagraph>
            <BlogParagraph>
                I then had the thought that
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
                    </Link>
                    on both your computer and the device(s) you want to use
                </BlogListItem>
                <BlogListItem>
                    Create a Tailscale account and create a new tailnet
                </BlogListItem>
                <BlogListItem>
                    Connect both devices to the same Tailscale network
                </BlogListItem>
                <BlogListItem>
                    Install your expo development build app on your device
                </BlogListItem>
                <BlogListItem>
                    Open the{" "}
                    <Link href="https://expo.dev/" external>
                        Expo Go
                    </Link>{" "}
                    app and click on the{" "}
                    <Link href="https://expo.dev/" external>
                        Connect to a development server
                    </Link>{" "}
                    button
                </BlogListItem>
                <BlogListItem>
                    Enter your Tailscale key and click{" "}
                    <Link href="https://expo.dev/" external>
                        Connect
                    </Link>
                </BlogListItem>
                <BlogListItem>
                    Select the{" "}
                    <Link href="https://expo.dev/" external>
                        Connect to a development server
                    </Link>{" "}
                    option
                </BlogListItem>
            </BlogUnorderedList>
        </>
    );
}
export default HOW_TO_REMOTELY_CONNECT_AN_EXPO_DEVELOPMENT_BUILD_TO_YOUR_LOCAL_DEV_SERVER;
