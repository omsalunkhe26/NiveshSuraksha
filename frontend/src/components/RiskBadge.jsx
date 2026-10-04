import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskBadge = ({ level, score = null, size = "md" }) => {
  const normLevel = (level || "LOW").toUpperCase();

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3.5 py-1.5",
    lg: "text-base px-5 py-2.5 font-bold"
  };

  if (normLevel === "CRITICAL") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/60 font-semibold ${sizeClasses[size]}`}>
        <AlertOctagon className={size === "lg" ? "w-5 h-5 text-rose-400 animate-pulse" : "w-4 h-4 text-rose-400"} />
        <span>CRITICAL RISK</span>
        {score !== null && <span className="ml-1 opacity-90">({score}/100)</span>}
      </span>
    );
  }

  if (normLevel === "HIGH") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/60 font-semibold ${sizeClasses[size]}`}>
        <ShieldAlert className={size === "lg" ? "w-5 h-5 text-orange-400" : "w-4 h-4 text-orange-400"} />
        <span>HIGH RISK</span>
        {score !== null && <span className="ml-1 opacity-90">({score}/100)</span>}
      </span>
    );
  }

  if (normLevel === "MEDIUM") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/60 font-semibold ${sizeClasses[size]}`}>
        <AlertTriangle className={size === "lg" ? "w-5 h-5 text-amber-400" : "w-4 h-4 text-amber-400"} />
        <span>MEDIUM RISK</span>
        {score !== null && <span className="ml-1 opacity-90">({score}/100)</span>}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-semibold ${sizeClasses[size]}`}>
      <ShieldCheck className={size === "lg" ? "w-5 h-5 text-emerald-400" : "w-4 h-4 text-emerald-400"} />
      <span>LOW RISK</span>
      {score !== null && <span className="ml-1 opacity-90">({score}/100)</span>}
    </span>
  );
};
