import {
    BlogCode,
    BlogHeading,
    BlogParagraph,
    BlogSubHeading,
} from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const RULE_OF_3: BlogData = {
    title: "Why are dates so hard?",
    description:
        "Why dates and timezones are so hard to work with, and a simple approach to reasoning about them.",
    date: "2026-03-01",
    slug: "why-are-dates-so-hard",
    tags: ["programming"],
    image: {
        src: "/images/rants/dates.png",
        alt: "A clock melting at the thought of working with dates and timezones",
    },
    component: <WhyAreDatesSoHard />,
};

function WhyAreDatesSoHard() {
    return (
        <>
            <BlogParagraph>
                Disclaimer: This will be a living document that I will update if
                I can ever develop an understanding...
            </BlogParagraph>
            <BlogParagraph>
                I recently had a task to find out how many alerts were sent to a
                slack channel per day in the last week. This involved creating a
                cron which ran in one timezone, working out the end of the day
                in the channel timezone and converting that back to a unix
                timestamp to send to slack, then formatting the results to show
                which day the alerts were sent on. This got me thinking, I have
                been doing this for a long time, and I still don&apos;t
                intuitively understand how to work with dates and timezones. Why
                is this so hard?
            </BlogParagraph>
            <BlogHeading>Libraries</BlogHeading>
            <BlogParagraph>
                There are a number of modern libraries that make working with
                dates much easier, the two I have used most recently are
                date-fns and dayjs (itself a moment clone). Any of these modern
                solutions will do the job, and I haven&apos;t developed a
                preference for one over the other.
            </BlogParagraph>
            <BlogHeading>Formatting</BlogHeading>
            <BlogParagraph>
                Something I think I now have a handle on is formatting. The Intl
                API is really powerful and can handle most of the formatting you
                could ever need. The problem comes with inconsistent designers
                and product managers who tend to want different formats for
                different things. Much of the time this is unintended and can be
                easily agreed on a few formats, but genuine use cases do arise.
                For anything not covered by Intl, the above mentioned libraries
                can fill in the blanks.
            </BlogParagraph>
            <BlogHeading>Manipulation</BlogHeading>
            <BlogParagraph>
                Another solved problem is date manipulation. I would generally
                avoid trying to use the built in Date object for this, and
                instead jump straight to a library. Need to set a specific hour
                of the day? <BlogCode>dayjs().hour(9)</BlogCode>. Need to find
                something from a week ago?{" "}
                <BlogCode>dayjs().subtract(1, &qout;week&qout;)</BlogCode>. Need
                to find the end of the day?{" "}
                <BlogCode>dayjs().endOf(&qout;day&qout;)</BlogCode>. No
                confusion here.
            </BlogParagraph>
            <BlogHeading>Timezones</BlogHeading>
            <BlogParagraph>
                The real problem with dates is usually timezones. How can you
                display the time the user is expecting for an appointment? How
                can you work out what messages were sent on a particular day in
                a particular timezone? How can you display the time of an event
                in the timezone it is happening in?
            </BlogParagraph>
            <BlogSubHeading>Store everything in UTC</BlogSubHeading>
            <BlogParagraph>
                The first argument I have heard is to store everything in UTC
                and convert to the user timezone when displaying. This is a good
                approach, but it is hardly intuitive. When you look at a
                database record with a timestamp, you need to remember that it
                is in UTC and convert it to your local timezone in your head to
                understand when the event actually happened. This is a mental
                overhead that can lead to mistakes and confusion.
            </BlogParagraph>
            <BlogParagraph>
                Unfortunately there is no escaping this fact, especially when it
                comes to databases. Things that have already happened should
                always be stored at rest in UTC, so that there is no confusion
                about when they actually happened.
            </BlogParagraph>
            <BlogHeading>Convert to the relevant timezone</BlogHeading>
            <BlogParagraph>
                This is where different libraries can differ. date-fns uses
                JavaScript&apos;s dates internally, which use the local timezone
                of the environment they are running in. dayjs has its own
                method, but also uses the local timezone of the environment it
                is running in. Both libraries have utc and timezone plugins
                which can be used to convert to a specific timezone, but this is
                not the default behaviour and can lead to confusion if you
                aren&apos;t aware.
            </BlogParagraph>
            <BlogSubHeading>Sending to an API</BlogSubHeading>
            <BlogParagraph>
                So given that dates should be stored in UTC, but most frontend
                libraries use the local timezone of the environment they are
                running in, how should you send dates to an API? The best
                approach I have found is to convert to UTC before sending to the
                API. Or send the timezone along with the date, and let the API
                handle the conversion. This way you can be sure that the API is
                always receiving dates in a consistent format, and you can avoid
                any confusion about timezones on the frontend.
            </BlogParagraph>
            <BlogHeading>Events</BlogHeading>
            <BlogParagraph>
                What about birthdays? If you were born on the 1st of January,
                you will always be born on the 1st of January, regardless of
                timezones. How would you store this?
            </BlogParagraph>
            <BlogParagraph>
                The best approach I have found is to store the date as a string
                in the format YYYY-MM-DD. This way you can be sure that the date
                is always the same, regardless of timezones. You can then use a
                library to parse this string and convert it to a date object
                when you need to display it or manipulate it.
            </BlogParagraph>
            <BlogParagraph>
                As another dimension, you need to be conscious of how databases
                handle dates. Usually you may want to order events by date or
                filter events by date, and this approach allows you to do that
                without worrying about timezones.
            </BlogParagraph>
            <BlogParagraph>
                If the event includes a time, then you can store the intended
                local date and time as a string in the format
                YYYY-MM-DDTHH:mm:ssZ. This way you can be sure that the date and
                time are always the same, regardless of any timezone changes.
                You can then use one of the above libraries to parse this string
                and convert it to a date object when you need to display it or
                manipulate it. Just be conscious that each database has
                it&apos;s own way of handling dates and times natively.
            </BlogParagraph>
            <BlogParagraph>
                What if you need to filter events by date? For example, you want
                to find all events that happened on the 1st of March. Again,
                each database has its own way of handling this, but their are
                inbuilt ways of doing this with and without timezones. For
                example, in Postgres you can use the following:{" "}
            </BlogParagraph>
            <BlogCode>
                {`SELECT * FROM events
WHERE (event_timestamp AT TIME ZONE 'Australia/Brisbane')::date = '2026-03-01';`}
            </BlogCode>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>Dates are hard.</BlogParagraph>
        </>
    );
}

export default WhyAreDatesSoHard;
