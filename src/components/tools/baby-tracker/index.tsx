"use client";

import { Baby, Utensils, Droplets, Clock, PencilIcon, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useLocalStorage from "@/hooks/use-local-storage";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    formatDate,
    formatDateTimeLocal,
    formatRelativeDate,
    formatDateDifference,
} from "@/lib/date";
import BabyTrackerGraph from "./graph";
import { formatTime } from "@/lib/time";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ToolData } from "..";
import { Label } from "@/components/ui/label";

type ActivityBase = {
    id: string;
    notes?: string;
};

type FeedingActivity = ActivityBase & {
    type: "feeding";
    time: Date;
};

type PoopingActivity = ActivityBase & {
    type: "pooping";
    time: Date;
};

type WeeActivity = ActivityBase & {
    type: "wee";
    time: Date;
};

type SleepingActivity = ActivityBase & {
    type: "sleeping";
    time: Date;
    startTime: Date;
    endTime: Date;
};

type Activity =
    | FeedingActivity
    | PoopingActivity
    | WeeActivity
    | SleepingActivity;

const STORAGE_KEY = "baby-tracker-activities";

function BabyTracker({ title, description }: ToolData) {
    const [activities, setActivities] = useLocalStorage<Activity[]>(
        STORAGE_KEY,
        [],
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activityType, setActivityType] = useState<Activity["type"] | null>(
        null,
    );
    const [editingActivity, setEditingActivity] = useState<Activity | null>(
        null,
    );
    const [prevActivity, setPreviousActivity] = useState<Activity | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState(
        formatDate(new Date()),
    );
    const [selectedStartTime, setSelectedStartTime] = useState(
        formatDateTimeLocal(new Date()),
    );
    const [selectedEndTime, setSelectedEndTime] = useState(
        formatDateTimeLocal(new Date()),
    );
    const [selectedNotes, setSelectedNotes] = useState("");

    const getRecentActivities = () => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        return activities.filter(
            (activity) => new Date(activity.time) >= twentyFourHoursAgo,
        );
    };

    const recentActivities = getRecentActivities();

    if (!editingActivity && prevActivity) {
        setPreviousActivity(null);
        setSelectedDateTime(formatDateTimeLocal(new Date()));
        setSelectedNotes("");
        setActivityType(null);
    }

    if (editingActivity && editingActivity.id !== prevActivity?.id) {
        setPreviousActivity(editingActivity);
        if (editingActivity.type === "sleeping") {
            setSelectedStartTime(
                formatDateTimeLocal(new Date(editingActivity.startTime)),
            );
            setSelectedEndTime(
                formatDateTimeLocal(new Date(editingActivity.endTime)),
            );
        } else {
            setSelectedDateTime(
                formatDateTimeLocal(new Date(editingActivity.time)),
            );
        }
        setSelectedNotes(editingActivity.notes || "");
        setActivityType(editingActivity.type);
    }

    const saveActivity = (type: Activity["type"]) => {
        if (editingActivity) {
            setActivities((prev) =>
                prev.map((activity) => {
                    if (activity.id !== editingActivity.id) {
                        return activity;
                    }

                    if (activity.type === "sleeping") {
                        return {
                            ...activity,
                            startTime: new Date(selectedStartTime),
                            endTime: new Date(selectedEndTime),
                            time: new Date(selectedStartTime),
                            notes: selectedNotes,
                        };
                    }

                    return {
                        ...activity,
                        time: new Date(selectedDateTime),
                        notes: selectedNotes,
                    };
                }),
            );
        } else {
            let newActivity: Activity;
            switch (type) {
                case "feeding":
                case "pooping":
                case "wee":
                    newActivity = {
                        id: Date.now().toString(),
                        type,
                        time: new Date(selectedDateTime),
                        notes: selectedNotes,
                    };
                    break;
                case "sleeping":
                    newActivity = {
                        id: Date.now().toString(),
                        type: "sleeping",
                        time: new Date(selectedStartTime),
                        startTime: new Date(selectedStartTime),
                        endTime: new Date(selectedEndTime),
                        notes: selectedNotes,
                    };
                    break;
            }
            setActivities((prev) => {
                const updatedActivities = [newActivity, ...prev];
                return updatedActivities.sort(
                    (a, b) =>
                        new Date(b.time).getTime() - new Date(a.time).getTime(),
                );
            });
        }
        setIsDialogOpen(false);
        setActivityType(null);
        setEditingActivity(null);
    };

    const deleteActivity = (id: string) => {
        setActivities((prev) => prev.filter((activity) => activity.id !== id));
    };

    const getActivityIcon = (type: Activity["type"]) => {
        switch (type) {
            case "feeding":
                return <Utensils className="h-4 w-4" />;
            case "pooping":
                return <Baby className="h-4 w-4" />;
            case "wee":
                return <Droplets className="h-4 w-4" />;
            case "sleeping":
                return <Bed className="h-4 w-4" />;
        }
    };

    const getActivityVariant = (type: Activity["type"]) => {
        switch (type) {
            case "feeding":
                return "default";
            case "pooping":
                return "secondary";
            case "wee":
                return "outline";
            case "sleeping":
                return "destructive";
        }
    };

    const getLastActivity = (type: Activity["type"]) => {
        const lastActivity = activities.find(
            (activity) => activity.type === type,
        );
        return lastActivity ? formatRelativeDate(lastActivity.time) : "Never";
    };

    useEffect(() => {
        const onFocus = () => {
            setSelectedDateTime(formatDate(new Date()));
            setSelectedStartTime(formatDateTimeLocal(new Date()));
            setSelectedEndTime(formatDateTimeLocal(new Date()));
        };

        window.addEventListener("focus", onFocus);

        return () => {
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={(change) => {
                setIsDialogOpen(change);
                if (!change) {
                    setEditingActivity(null);
                    setSelectedNotes("");
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (activityType) {
                            saveActivity(activityType);
                        }
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {editingActivity ? "Edit" : "Add"} {activityType}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {activityType === "sleeping" ? (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="starttime"
                                        className="text-right"
                                    >
                                        Start Time
                                    </Label>
                                    <Input
                                        id="starttime"
                                        type="datetime-local"
                                        value={selectedStartTime}
                                        onChange={(e) => {
                                            setSelectedStartTime(
                                                e.target.value,
                                            );
                                            if (
                                                new Date(e.target.value) >
                                                new Date(selectedEndTime)
                                            ) {
                                                setSelectedEndTime(
                                                    e.target.value,
                                                );
                                            }
                                        }}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="endtime"
                                        className="text-right"
                                    >
                                        End Time
                                    </Label>
                                    <Input
                                        id="endtime"
                                        type="datetime-local"
                                        value={selectedEndTime}
                                        onChange={(e) =>
                                            setSelectedEndTime(e.target.value)
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="datetime"
                                    className="text-right"
                                >
                                    Date & Time
                                </Label>
                                <Input
                                    id="datetime"
                                    type="datetime-local"
                                    value={selectedDateTime}
                                    onChange={(e) =>
                                        setSelectedDateTime(e.target.value)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any notes..."
                                value={selectedNotes}
                                onChange={(e) =>
                                    setSelectedNotes(e.target.value)
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {editingActivity && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    deleteActivity(editingActivity.id);
                                    setIsDialogOpen(false);
                                    setEditingActivity(null);
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-foreground mb-2 text-3xl font-bold">
                        {title}
                    </h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <DialogTrigger
                        render={
                            <Button
                                onClick={() => {
                                    setActivityType("feeding");
                                    setIsDialogOpen(true);
                                }}
                                size="lg"
                                variant="default"
                            >
                                <Utensils className="mr-2 h-6 w-6" />
                                Log Feeding
                                <span className="ml-auto text-sm opacity-75">
                                    Last: {getLastActivity("feeding")}
                                </span>
                            </Button>
                        }
                    />

                    <DialogTrigger
                        render={
                            <Button
                                onClick={() => {
                                    setActivityType("pooping");
                                    setIsDialogOpen(true);
                                }}
                                size="lg"
                                variant="secondary"
                            >
                                <Baby className="mr-2 h-6 w-6" />
                                Log Pooping
                                <span className="ml-auto text-sm opacity-75">
                                    Last: {getLastActivity("pooping")}
                                </span>
                            </Button>
                        }
                    />
                    <DialogTrigger
                        render={
                            <Button
                                onClick={() => {
                                    setActivityType("wee");
                                    setIsDialogOpen(true);
                                }}
                                size="lg"
                                variant="outline"
                            >
                                <Droplets className="mr-2 h-6 w-6" />
                                Log Wee
                                <span className="ml-auto text-sm opacity-75">
                                    Last: {getLastActivity("wee")}
                                </span>
                            </Button>
                        }
                    />
                    <DialogTrigger
                        render={
                            <Button
                                onClick={() => {
                                    setActivityType("sleeping");
                                    setIsDialogOpen(true);
                                }}
                                size="lg"
                                variant="destructive"
                            >
                                <Bed className="mr-2 h-6 w-6" />
                                Log Sleep
                                <span className="ml-auto text-sm opacity-75">
                                    Last: {getLastActivity("sleeping")}
                                </span>
                            </Button>
                        }
                    />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Activities
                        </CardTitle>
                        <CardDescription>
                            {recentActivities.length === 0
                                ? "No activities logged in the last 24 hours"
                                : `${recentActivities.length} activities logged in the last 24 hours`}
                        </CardDescription>
                    </CardHeader>
                    {recentActivities.length === 0 ? (
                        <div className="text-muted-foreground py-8 text-center">
                            <Baby className="mx-auto mb-3 h-12 w-12 opacity-50" />
                            <p>No recent activities to display.</p>
                        </div>
                    ) : (
                        recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="active:bg-accent hover:bg-accent flex cursor-pointer flex-row items-center justify-between gap-3 px-6 py-4"
                                onClick={() => {
                                    setEditingActivity(activity);
                                    setIsDialogOpen(true);
                                }}
                            >
                                <div className="flex w-24">
                                    <Badge
                                        variant={getActivityVariant(
                                            activity.type,
                                        )}
                                        className="flex-1 justify-center"
                                    >
                                        {getActivityIcon(activity.type)}
                                        <span className="ml-1 capitalize">
                                            {activity.type}
                                        </span>
                                    </Badge>
                                </div>
                                <div className="text-muted-foreground flex-1 text-sm">
                                    {activity.type === "sleeping" ? (
                                        <>
                                            <div className="font-medium">
                                                {formatTime(activity.startTime)}{" "}
                                                - {formatTime(activity.endTime)}
                                            </div>
                                            <div>
                                                {formatDateDifference(
                                                    new Date(
                                                        activity.startTime,
                                                    ),
                                                    new Date(activity.endTime),
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="font-medium">
                                                {formatDate(activity.time)}
                                            </div>
                                            <div>
                                                {formatTime(activity.time)} •{" "}
                                                {formatRelativeDate(
                                                    activity.time,
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {activity.notes && (
                                        <div className="text-muted-foreground text-xs">
                                            {activity.notes}
                                        </div>
                                    )}
                                </div>
                                <Button disabled variant="ghost" size="sm">
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </Card>
                {activities.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Today&apos;s Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4 pt-4 text-center">
                                {(
                                    [
                                        "feeding",
                                        "pooping",
                                        "wee",
                                        "sleeping",
                                    ] as const
                                ).map((type) => {
                                    const todayCount = activities.filter(
                                        (activity) =>
                                            activity.type === type &&
                                            new Date(
                                                activity.time,
                                            ).toDateString() ===
                                                new Date().toDateString(),
                                    );

                                    if (type === "sleeping") {
                                        const totalSleep = todayCount.reduce(
                                            (acc, activity) => {
                                                if (
                                                    activity.type === "sleeping"
                                                ) {
                                                    return (
                                                        acc +
                                                        (new Date(
                                                            activity.endTime,
                                                        ).getTime() -
                                                            new Date(
                                                                activity.startTime,
                                                            ).getTime())
                                                    );
                                                }
                                                return acc;
                                            },
                                            0,
                                        );

                                        const hours = Math.floor(
                                            totalSleep / (1000 * 60 * 60),
                                        );
                                        const minutes = Math.floor(
                                            (totalSleep % (1000 * 60 * 60)) /
                                                (1000 * 60),
                                        );

                                        return (
                                            <div
                                                key={type}
                                                className="space-y-1"
                                            >
                                                <div className="text-foreground text-xl font-bold">
                                                    {hours}h {minutes}m
                                                </div>
                                                <div className="text-muted-foreground text-sm capitalize">
                                                    Sleep
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={type} className="space-y-1">
                                            <div className="text-foreground text-xl font-bold">
                                                {todayCount.length}
                                            </div>
                                            <div className="text-muted-foreground text-sm capitalize">
                                                {type}
                                                {todayCount.length !== 1
                                                    ? "s"
                                                    : ""}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}
                <BabyTrackerGraph activities={activities} />
            </div>
        </Dialog>
    );
}

export { BabyTracker };
