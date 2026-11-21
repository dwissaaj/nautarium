"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  Typography,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";

import { Task } from "@/app/lib/(home)/notes/notes";

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (task: Task) => void;
}

const statusOptions = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const priorityOptions = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

const statusStyles: Record<Task["status"], string> = {
  todo: "!bg-violet-100 !text-violet-600",
  "in-progress": "!bg-pink-100 !text-pink-700",
  done: "!bg-teal-100 !text-teal-700",
};

const priorityStyles: Record<Task["priority"], string> = {
  low: "!bg-green-100 !text-green-700",
  medium: "!bg-yellow-100 !text-yellow-700",
  high: "!bg-red-100 !text-red-700",
};

function createNewTask(): Task {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export default function TaskDrawer({
  task,
  isOpen,
  onOpenChange,
  onSave,
}: TaskDrawerProps) {
  const [formData, setFormData] = useState<Task | null>(null);

  const isEditing = task !== null;

  useEffect(() => {
    if (!isOpen) return;

    setFormData(task ? { ...task } : createNewTask());
  }, [isOpen, task]);

  function handleSave() {
    if (!formData || !formData.title.trim()) return;

    onSave({
      ...formData,
      title: formData.title.trim(),
    });

    onOpenChange(false);
  }

  return (
    <Drawer>
      <Button aria-label="Open task drawer" className="sr-only">
        Open task drawer
      </Button>

      <Drawer.Backdrop
        isOpen={isOpen}
        variant="blur"
        onOpenChange={onOpenChange}
      >
        <Drawer.Content placement="right">
          <Drawer.Dialog className="h-full w-full max-w-xl bg-default">
            <Drawer.CloseTrigger />

            <Drawer.Header className="border-b border-default-200 px-6 py-5">
              <div className="space-y-1">
                <Drawer.Heading className="text-3xl font-bold">
                  {isEditing ? "Edit task" : "Create task"}
                </Drawer.Heading>

                <Typography className="mt-1 text-default-500" type="body-sm">
                  {isEditing
                    ? "Update your task details and progress."
                    : "Create a new task for your board."}
                </Typography>
              </div>
            </Drawer.Header>

            <Drawer.Body className="space-y-6 px-6 py-6 ">
              {formData && (
                <>
                  {/* Task title */}
                  <TextField
                    isRequired
                    className="w-full"
                    value={formData.title}
                    onChange={(value) =>
                      setFormData((current) =>
                        current ? { ...current, title: value } : current,
                      )
                    }
                  >
                    <Label className="text-lg font-semibold">Task title</Label>

                    <Input fullWidth placeholder="Enter task title" />
                  </TextField>

                  {/* Description */}
                  <TextField
                    className="w-full"
                    value={formData.description}
                    onChange={(value) =>
                      setFormData((current) =>
                        current ? { ...current, description: value } : current,
                      )
                    }
                  >
                    <Label className="text-lg font-semibold">Description</Label>

                    <TextArea placeholder="Describe your task..." rows={5} />
                  </TextField>

                  {/* Status */}
                  <Select
                    className="w-full"
                    value={formData.status}
                    onChange={(value) => {
                      if (typeof value === "string") {
                        setFormData((current) =>
                          current
                            ? {
                                ...current,
                                status: value as Task["status"],
                              }
                            : current,
                        );
                      }
                    }}
                  >
                    <Label className="text-lg font-semibold">Status</Label>

                    <Select.Trigger
                      className={`w-full rounded-xl border border-default-200 px-4 py-3 ${statusStyles[formData.status]}`}
                    >
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {statusOptions.map((option) => (
                          <ListBox.Item
                            key={option.id}
                            id={option.id}
                            textValue={option.label}
                          >
                            {option.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Priority */}
                  <Select
                    className="w-full"
                    value={formData.priority}
                    onChange={(value) => {
                      if (typeof value === "string") {
                        setFormData((current) =>
                          current
                            ? {
                                ...current,
                                priority: value as Task["priority"],
                              }
                            : current,
                        );
                      }
                    }}
                  >
                    <Label className="text-lg font-semibold">Priority</Label>

                    <Select.Trigger
                      className={`w-full rounded-xl border border-default-200 px-4 py-3 ${priorityStyles[formData.priority]}`}
                    >
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {priorityOptions.map((option) => (
                          <ListBox.Item
                            key={option.id}
                            id={option.id}
                            textValue={option.label}
                          >
                            {option.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Created date */}
                  <DatePicker
                    className="w-full"
                    name="createdAt"
                    value={parseDate(formData.createdAt.slice(0, 10))}
                    onChange={(date) =>
                      setFormData((current) =>
                        current
                          ? {
                              ...current,
                              createdAt: date?.toString() ?? current.createdAt,
                            }
                          : current,
                      )
                    }
                  >
                    <Label className="text-lg font-semibold">
                      Created date
                    </Label>

                    <DateField.Group fullWidth>
                      <DateField.Input>
                        {(segment) => <DateField.Segment segment={segment} />}
                      </DateField.Input>

                      <DateField.Suffix>
                        <DatePicker.Trigger>
                          <DatePicker.TriggerIndicator />
                        </DatePicker.Trigger>
                      </DateField.Suffix>
                    </DateField.Group>

                    <DatePicker.Popover>
                      <Calendar aria-label="Task creation date">
                        <Calendar.Header>
                          <Calendar.YearPickerTrigger>
                            <Calendar.YearPickerTriggerHeading />
                            <Calendar.YearPickerTriggerIndicator />
                          </Calendar.YearPickerTrigger>

                          <Calendar.NavButton slot="previous" />
                          <Calendar.NavButton slot="next" />
                        </Calendar.Header>

                        <Calendar.Grid>
                          <Calendar.GridHeader>
                            {(day) => (
                              <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                            )}
                          </Calendar.GridHeader>

                          <Calendar.GridBody>
                            {(date) => <Calendar.Cell date={date} />}
                          </Calendar.GridBody>
                        </Calendar.Grid>

                        <Calendar.YearPickerGrid>
                          <Calendar.YearPickerGridBody>
                            {({ year }) => (
                              <Calendar.YearPickerCell year={year} />
                            )}
                          </Calendar.YearPickerGridBody>
                        </Calendar.YearPickerGrid>
                      </Calendar>
                    </DatePicker.Popover>
                  </DatePicker>
                </>
              )}
            </Drawer.Body>

            <Drawer.Footer className="border-t border-default-200 px-6 py-4">
              <div className="flex w-full justify-end gap-2">
                <Button variant="secondary" onPress={() => onOpenChange(false)}>
                  Cancel
                </Button>

                <Button
                  className="bg-foreground text-background"
                  isDisabled={!formData?.title.trim()}
                  onPress={handleSave}
                >
                  {isEditing ? "Save changes" : "Create task"}
                </Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
