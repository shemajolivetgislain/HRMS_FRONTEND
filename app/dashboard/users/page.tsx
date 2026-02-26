"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  AdvancedDataTable,
  type ColumnDef,
} from "@/components/dashboard/advanced-data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { UserAvatar } from "@/components/dashboard/user-avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Add01Icon,
  Download01Icon,
  MoreHorizontalIcon,
  Mail01Icon,
  LockPasswordIcon,
  Delete02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "pending";
  hireDate: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "active",
    hireDate: "2021-03-15",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    department: "HR",
    position: "HR Manager",
    status: "active",
    hireDate: "2020-07-22",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    department: "Sales",
    position: "Sales Executive",
    status: "active",
    hireDate: "2022-01-10",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    department: "Finance",
    position: "Finance Analyst",
    status: "pending",
    hireDate: "2024-02-01",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    department: "Engineering",
    position: "DevOps Engineer",
    status: "inactive",
    hireDate: "2019-06-12",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    hireDate: "2021-11-05",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james@example.com",
    department: "Engineering",
    position: "QA Engineer",
    status: "active",
    hireDate: "2022-03-20",
  },
  {
    id: "8",
    name: "Rachel Green",
    email: "rachel@example.com",
    department: "Operations",
    position: "Operations Coordinator",
    status: "active",
    hireDate: "2021-09-14",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Filter and search logic
  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || user.department === filterDept;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = ["all", ...new Set(sampleUsers.map((u) => u.department))];
  const statuses = ["all", "active", "inactive", "pending"];

  // Column definitions
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (value, row) => (
        <UserAvatar name={value as string} email={row.email} size="sm" />
      ),
      sortable: true,
      width: "280px",
    },
    {
      accessorKey: "department",
      header: "Department",
      sortable: true,
      cell: (value) => <span className="text-sm">{value}</span>,
    },
    {
      accessorKey: "position",
      header: "Position",
      sortable: true,
      cell: (value) => <span className="text-sm">{value}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      sortable: true,
      cell: (value) => (
        <StatusBadge status={value as "active" | "inactive" | "pending"} />
      ),
    },
    {
      accessorKey: "hireDate",
      header: "Hire Date",
      sortable: true,
      cell: (value) => (
        <span className="text-sm text-muted-foreground">
          {new Date(value as string).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: (_, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon">
                <HugeiconsIcon icon={MoreHorizontalIcon} className="w-4 h-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              render={<Link href={`/dashboard/users/${row.id}`} />}
            >
              <HugeiconsIcon icon={ViewIcon} className="w-4 h-4 mr-2" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 mr-2" />
              <span>Send Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={LockPasswordIcon} className="w-4 h-4 mr-2" />
              <span>Reset Password</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4 mr-2" />
              <span>Deactivate</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Department Filter */}
          <Select
            value={filterDept}
            onValueChange={(val) => setFilterDept(val || "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={filterStatus}
            onValueChange={(val) => setFilterStatus(val || "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Export */}
          <Button variant="outline" className="gap-2">
            <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Batch Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              {selectedUsers.length} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4 mr-2" />
                Deactivate
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Data Table */}
      <Card className="p-6">
        <AdvancedDataTable
          columns={columns}
          data={filteredUsers}
          selectable={true}
          onSelectionChange={setSelectedUsers}
          onRowClick={(user) => {
            console.log("Row clicked:", user);
          }}
        />
      </Card>
    </div>
  );
}
