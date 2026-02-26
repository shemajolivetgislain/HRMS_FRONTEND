'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Sorting05Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export interface ColumnDef<T> {
  accessorKey: keyof T
  header: string
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  selectable?: boolean
  onRowClick?: (row: T) => void
  onSelectionChange?: (selected: T[]) => void
}

export function AdvancedDataTable<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  selectable = true,
  onRowClick,
  onSelectionChange,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

  const totalPages = Math.ceil(data.length / pageSize)
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const paginatedData = data.slice(startIdx, endIdx)

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    } else {
      const newSelected = new Set(
        paginatedData.map((row) => row.id || Math.random().toString())
      )
      setSelectedRows(newSelected)
      const selectedData = paginatedData.filter(
        (row) => newSelected.has(row.id || Math.random().toString())
      )
      onSelectionChange?.(selectedData)
    }
  }

  const handleSelectRow = (rowId: string | number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId)
    } else {
      newSelected.add(rowId)
    }
    setSelectedRows(newSelected)
    const selectedData = paginatedData.filter(
      (row) => newSelected.has(row.id || Math.random().toString())
    )
    onSelectionChange?.(selectedData)
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {selectable && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        paginatedData.length > 0 &&
                        selectedRows.size === paginatedData.length
                      }
                      indeterminate={
                        selectedRows.size > 0 &&
                        selectedRows.size < paginatedData.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                {columns.map((column) => (
                  <TableHead
                    key={String(column.accessorKey)}
                    className={cn(
                      'font-semibold text-foreground',
                      column.width && `w-[${column.width}]`
                    )}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.accessorKey)}
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        {column.header}
                        <HugeiconsIcon icon={Sorting05Icon} className="w-4 h-4 opacity-50" />
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={selectable ? columns.length + 1 : columns.length}
                    className="text-center py-8"
                  >
                    <p className="text-muted-foreground">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={selectable ? columns.length + 1 : columns.length}
                    className="text-center py-8"
                  >
                    <p className="text-muted-foreground">No data available</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => (
                  <TableRow
                    key={String(row.id || Math.random())}
                    className="hover:bg-muted transition-colors duration-200 cursor-pointer"
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(row.id || Math.random().toString())}
                          onCheckedChange={() =>
                            handleSelectRow(row.id || Math.random().toString())
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = row[column.accessorKey]
                      return (
                        <TableCell
                          key={String(column.accessorKey)}
                          onClick={() => onRowClick?.(row)}
                          className="cursor-pointer text-sm"
                        >
                          {column.cell ? column.cell(value, row) : String(value)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Rows per page:
          </span>
          <Select value={String(pageSize)} onValueChange={(value) => {
            setPageSize(Number(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          {startIdx + 1} - {Math.min(endIdx, data.length)} of {data.length}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-2">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
