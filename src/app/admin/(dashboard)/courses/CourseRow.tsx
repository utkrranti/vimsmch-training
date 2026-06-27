"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toggleCourseActive, deleteCourse } from "./actions";

type CourseRowProps = {
  course: {
    id: string;
    slug: string;
    title: string;
    category: string;
    nsqf: number;
    fees: number;
    seats: number;
    isActive: boolean;
    _count: { inquiries: number; enrollments: number };
  };
  zebra: boolean;
};

export default function CourseRow({ course, zebra }: CourseRowProps) {
  const [active, setActive] = useState(course.isActive);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const next = !active;
    setActive(next);
    startTransition(async () => {
      await toggleCourseActive(course.id, next);
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteCourse(course.id);
    });
  };

  return (
    <tr className={`border-b border-[#e6edf0] ${zebra ? "bg-[#f8fafb]" : "bg-white"} hover:bg-[#f1f5f7] transition-colors`}>
      <td className="px-5 py-3">
        <div className="font-medium text-[#011e2c] leading-snug max-w-[200px]">{course.title}</div>
        <div className="text-[10px] text-[#010608]/40 mt-0.5">{course.slug}</div>
      </td>
      <td className="px-5 py-3">
        <span className="bg-[#e6edf0] text-[#04415f] text-xs font-semibold px-2.5 py-1 rounded-full">
          {course.category}
        </span>
      </td>
      <td className="px-5 py-3 text-[#010608]/60 font-medium">Level {course.nsqf}</td>
      <td className="px-5 py-3 text-[#010608]/60">₹{course.fees.toLocaleString("en-IN")}</td>
      <td className="px-5 py-3 text-[#010608]/60">{course.seats}</td>
      <td className="px-5 py-3 text-[#010608]/60">{course._count.inquiries}</td>
      <td className="px-5 py-3 text-[#010608]/60">{course._count.enrollments}</td>
      <td className="px-5 py-3">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-60 ${active ? "bg-emerald-500" : "bg-[#e2eaee]"}`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${active ? "translate-x-4" : "translate-x-0"}`}
          />
        </button>
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="p-1.5 rounded-lg text-[#04415f] hover:bg-[#e6edf0] transition-colors"
            title="Edit"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
