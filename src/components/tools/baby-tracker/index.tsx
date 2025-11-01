"use client";

import { Baby, Utensils, Droplets, Clock, PencilIcon } from "lucide-react";
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

type Activity = {
    id: string;
    type: "feeding" | "pooping" | "wee";
    timestamp: Date;
    notes?: string;
};

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
    const [selectedNotes, setSelectedNotes] = useState("");

    const getRecentActivities = () => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        return activities.filter(
            (activity) => new Date(activity.timestamp) >= twentyFourHoursAgo,
        );
    };

    const recentActivities = getRecentActivities();

    if (!editingActivity) {
        setPreviousActivity(null);
        setSelectedDateTime(formatDateTimeLocal(new Date()));
        setSelectedNotes("");
        setActivityType(null);
    } else if (editingActivity?.id !== prevActivity?.id) {
        setPreviousActivity(editingActivity);
        setSelectedDateTime(
            formatDateTimeLocal(new Date(editingActivity.timestamp)),
        );
        setSelectedNotes(editingActivity.notes || "");
        setActivityType(editingActivity.type);
    }

    const saveActivity = (type: Activity["type"]) => {
        if (editingActivity) {
            setActivities((prev) =>
                prev.map((activity) =>
                    activity.id === editingActivity.id
                        ? {
                              ...activity,
                              timestamp: new Date(selectedDateTime),
                              notes: selectedNotes,
                          }
                        : activity,
                ),
            );
        } else {
            // Adding new activity
            const newActivity: Activity = {
                id: Date.now().toString(),
                type,
                timestamp: new Date(selectedDateTime),
                notes: selectedNotes,
            };
            setActivities((prev) => {
                const updatedActivities = [newActivity, ...prev];
                return updatedActivities.sort(
                    (a, b) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime(),
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
        }
    };

    const getLastActivity = (type: Activity["type"]) => {
        const lastActivity = activities.find(
            (activity) => activity.type === type,
        );
        return lastActivity
            ? formatRelativeDate(lastActivity.timestamp)
            : "Never";
    };

    useEffect(() => {
        const onFocus = () => {
            setSelectedDateTime(formatDate(new Date()));
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="datetime" className="text-right">
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
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {title}
                    </h1>
                    <p className="text-gray-600">{description}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <DialogTrigger asChild>
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
                    </DialogTrigger>
                    <DialogTrigger asChild>
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
                    </DialogTrigger>
                    <DialogTrigger asChild>
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
                    </DialogTrigger>
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
                        <div className="py-8 text-center text-gray-500">
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
                                <div className="flex-1 text-sm text-gray-600">
                                    <div className="font-medium">
                                        {formatDate(activity.timestamp)}
                                    </div>
                                    <div>
                                        {formatTime(activity.timestamp)} •{" "}
                                        {formatRelativeDate(activity.timestamp)}
                                    </div>
                                    {activity.notes && (
                                        <div className="text-xs text-gray-500">
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
                            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                                {(["feeding", "pooping", "wee"] as const).map(
                                    (type) => {
                                        const todayCount = activities.filter(
                                            (activity) =>
                                                activity.type === type &&
                                                new Date(
                                                    activity.timestamp,
                                                ).toDateString() ===
                                                    new Date().toDateString(),
                                        ).length;

                                        return (
                                            <div
                                                key={type}
                                                className="space-y-1"
                                            >
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {todayCount}
                                                </div>
                                                <div className="text-sm text-gray-600 capitalize">
                                                    {type}
                                                    {todayCount !== 1
                                                        ? "s"
                                                        : ""}
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
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
