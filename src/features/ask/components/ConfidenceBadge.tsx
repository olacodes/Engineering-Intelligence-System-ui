interface ConfidenceBadgeProps {
  confidence: number;
}

function getConfidenceLevel(confidence: number) {
  if (confidence >= 0.8) {
    return {
      label: "High",
      className: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
  }

  if (confidence >= 0.5) {
    return {
      label: "Medium",
      className: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }

  return {
    label: "Low",
    className: "bg-rose-100 text-rose-800 border-rose-300",
  };
}

export function ConfidenceBadge({
  confidence,
}: Readonly<ConfidenceBadgeProps>) {
  const { label, className } = getConfidenceLevel(confidence);
  const percent = Math.round(confidence * 100);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
      title={`Confidence score: ${percent}%`}
    >
      <span>{label}</span>
      <span>{percent}%</span>
    </span>
  );
}
