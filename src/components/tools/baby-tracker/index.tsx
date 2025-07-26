"use client";

import { Baby, Utensils, Droplets, Trash2, Clock } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatDate, formatRelativeDate } from "@/lib/date";
import BabyTrackerGraph from "./graph";

type Activity = {
    id: string;
    type: "feeding" | "pooping" | "wee";
    timestamp: Date;
};

const STORAGE_KEY = "baby-tracker-activities";

export default function BabyTracker() {
    const [activities, setActivities] = useLocalStorage<Activity[]>(
        STORAGE_KEY,
        [],
    );

    const formatDateTimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [selectedDateTime, setSelectedDateTime] = useState(
        formatDateTimeLocal(new Date()),
    );

    const addActivity = (type: Activity["type"]) => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            type,
            timestamp: new Date(selectedDateTime),
        };
        setActivities((prev) => {
            const updatedActivities = [newActivity, ...prev];
            return updatedActivities.sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime(),
            );
        });
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

    const getActivityColor = (type: Activity["type"]) => {
        switch (type) {
            case "feeding":
                return "bg-green-100 text-green-800 border-green-200";
            case "pooping":
                return "bg-amber-100 text-amber-800 border-amber-200";
            case "wee":
                return "bg-blue-100 text-blue-800 border-blue-200";
        }
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getLastActivity = (type: Activity["type"]) => {
        const lastActivity = activities.find(
            (activity) => activity.type === type,
        );
        return lastActivity
            ? formatRelativeDate(lastActivity.timestamp)
            : "Never";
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Baby Tracker
                </h1>
                <p className="text-gray-600">
                    Keep track of your little one&apos;s activities
                </p>
            </div>

            <Input
                type="datetime-local"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                className="w-full"
            />

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
                <Button
                    onClick={() => addActivity("feeding")}
                    className="h-16 bg-green-600 text-lg hover:bg-green-700"
                    size="lg"
                >
                    <Utensils className="mr-2 h-6 w-6" />
                    Log Feeding
                    <span className="ml-auto text-sm opacity-75">
                        Last: {getLastActivity("feeding")}
                    </span>
                </Button>

                <Button
                    onClick={() => addActivity("pooping")}
                    className="h-16 bg-amber-600 text-lg hover:bg-amber-700"
                    size="lg"
                >
                    <Baby className="mr-2 h-6 w-6" />
                    Log Pooping
                    <span className="ml-auto text-sm opacity-75">
                        Last: {getLastActivity("pooping")}
                    </span>
                </Button>

                <Button
                    onClick={() => addActivity("wee")}
                    className="h-16 bg-blue-600 text-lg hover:bg-blue-700"
                    size="lg"
                >
                    <Droplets className="mr-2 h-6 w-6" />
                    Log Wee
                    <span className="ml-auto text-sm opacity-75">
                        Last: {getLastActivity("wee")}
                    </span>
                </Button>
            </div>

            {/* Recent Activities */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Activities
                    </CardTitle>
                    <CardDescription>
                        {activities.length === 0
                            ? "No activities logged yet"
                            : `${activities.length} activities logged`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {activities.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            <Baby className="mx-auto mb-3 h-12 w-12 opacity-50" />
                            <p>Start tracking your baby&apos;s activities!</p>
                        </div>
                    ) : (
                        <div className="max-h-96 space-y-3 overflow-y-auto">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            className={getActivityColor(
                                                activity.type,
                                            )}
                                        >
                                            {getActivityIcon(activity.type)}
                                            <span className="ml-1 capitalize">
                                                {activity.type}
                                            </span>
                                        </Badge>
                                        <div className="text-sm text-gray-600">
                                            <div className="font-medium">
                                                {formatDate(activity.timestamp)}
                                            </div>
                                            <div>
                                                {formatTime(activity.timestamp)}{" "}
                                                •{" "}
                                                {formatRelativeDate(
                                                    activity.timestamp,
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            deleteActivity(activity.id)
                                        }
                                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Summary Stats */}
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
                                        <div key={type} className="space-y-1">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {todayCount}
                                            </div>
                                            <div className="text-sm text-gray-600 capitalize">
                                                {type}
                                                {todayCount !== 1 ? "s" : ""}
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
    );
}
