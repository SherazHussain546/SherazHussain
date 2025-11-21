'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManagePosts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Posts</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">This section is under construction. Soon you'll be able to create, edit, and delete posts directly from here.</p>
                <Button disabled>Add New Post</Button>
            </CardContent>
        </Card>
    )
}
