type ColumnType = 
  | { type: "text"; width: string }
  | { type: "badge"; width: string }
  | { type: "actions"; count: number };

interface TableSkeletonProps {
  columns: ColumnType[];
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex} className="text-center bg-tertiary animate-pulse">
          {columns.map((col, colIndex) => (
            <td key={colIndex} className="py-3 border-x border-foreground">
              {col.type === "text" && (
                <div className={`h-6 bg-foreground/20 rounded ${col.width} mx-auto`} />
              )}
              {col.type === "badge" && (
                <div className={`h-8 bg-foreground/20 rounded-full ${col.width} mx-auto`} />
              )}
              {col.type === "actions" && (
                <div className="flex items-center justify-center gap-5">
                  {[...Array(col.count)].map((_, i) => (
                    <div key={i} className="h-7 w-7 bg-foreground/20 rounded" />
                  ))}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}