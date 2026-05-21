"use client";

import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "./reading-path";

const workflowLayers = [
  {
    titleKey: "dag.workflow.schema.title",
    descKey: "dag.workflow.schema.desc",
    detailKey: "dag.workflow.schema.detail",
    label: "schema",
  },
  {
    titleKey: "dag.workflow.config.title",
    descKey: "dag.workflow.config.desc",
    detailKey: "dag.workflow.config.detail",
    label: "config",
  },
  {
    titleKey: "dag.workflow.task.title",
    descKey: "dag.workflow.task.desc",
    detailKey: "dag.workflow.task.detail",
    label: "task",
  },
  {
    titleKey: "dag.workflow.harness.title",
    descKey: "dag.workflow.harness.desc",
    detailKey: "dag.workflow.harness.detail",
    label: "harness",
  },
  {
    titleKey: "dag.workflow.source.title",
    descKey: "dag.workflow.source.desc",
    detailKey: "dag.workflow.source.detail",
    label: "runtime",
  },
] as const;

export function DagWorkflow() {
  const { t } = useI18n();

  return (
    <section
      id="dag-workflow"
      className="py-20 md:py-28 px-6 border-t border-border"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="09"
          title={t("dag.workflow.title")}
          subtitle={t("dag.workflow.subtitle")}
        />

        <div className="rounded-xl border border-border bg-card p-4 md:p-8 mb-6">
          <WorkflowSourceDiagram />
        </div>

        <div className="rounded-xl bg-foreground px-5 py-4 mb-6">
          <div className="text-[10px] font-mono uppercase tracking-wider text-primary-foreground/35 mb-2">
            {t("dag.workflow.assembler.label")}
          </div>
          <p className="text-sm text-primary-foreground/75 leading-relaxed">
            {t("dag.workflow.assembler.beforeTopic")}
            <span className="text-primary-foreground font-mono">topic</span>
            {t("dag.workflow.assembler.afterTopicBeforeTurn")}
            <span className="text-primary-foreground font-mono">turn</span>
            {t("dag.workflow.assembler.afterTurn")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {workflowLayers.map((layer, index) => (
            <LayerCard
              key={layer.label}
              number={index + 1}
              title={t(layer.titleKey)}
              description={t(layer.descKey)}
              detail={t(layer.detailKey)}
              label={layer.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LayerCard({
  number,
  title,
  description,
  detail,
  label,
}: {
  number: number;
  title: string;
  description: string;
  detail: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <span className="text-[10px] font-mono text-accent">
          {String(number).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-mono uppercase text-muted-foreground/50">
          {label}
        </span>
      </div>
      <h3 className="text-sm font-mono font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <p className="text-xs font-mono text-foreground/70 leading-relaxed bg-secondary/35 rounded-lg px-3 py-2">
        {detail}
      </p>
    </div>
  );
}

function WorkflowSourceDiagram() {
  const { t } = useI18n();

  const nodes = [
    { id: "schema", label: "Task Schema", x: 36, y: 24, w: 132 },
    { id: "config", label: "Task Config", x: 36, y: 88, w: 132 },
    { id: "harness", label: "Task Harness", x: 36, y: 152, w: 132 },
    { id: "create", label: "Task Creation", x: 246, y: 74, w: 130 },
    { id: "desc", label: "Task Description", x: 430, y: 74, w: 152 },
    { id: "truth", label: "Runtime Source of Truth", x: 636, y: 74, w: 190 },
    { id: "artifacts", label: "Artifacts", x: 884, y: 74, w: 110 },
  ] as const;

  return (
    <svg
      viewBox="0 0 1030 220"
      className="w-full"
      fill="none"
      role="img"
      aria-label={t("dag.workflow.diagram.label")}
    >
      <defs>
        <marker
          id="dag-flow-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
      </defs>

      <path
        d="M168 47 C210 47 214 88 246 92"
        className="stroke-accent/70"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <path
        d="M168 111 C210 111 214 99 246 99"
        className="stroke-accent/70"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <path
        d="M168 175 C210 175 214 110 246 106"
        className="stroke-accent/70"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <path
        d="M168 42 C204 24 230 21 274 24"
        className="stroke-muted-foreground/55"
        strokeWidth="1.1"
        strokeDasharray="4 4"
        markerEnd="url(#dag-flow-arrow)"
      />
      <line
        x1="376"
        y1="97"
        x2="430"
        y2="97"
        className="stroke-accent"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <line
        x1="582"
        y1="97"
        x2="636"
        y2="97"
        className="stroke-accent"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <line
        x1="826"
        y1="97"
        x2="884"
        y2="97"
        className="stroke-accent"
        strokeWidth="1.5"
        markerEnd="url(#dag-flow-arrow)"
      />
      <path
        d="M730 120 C724 134 704 140 676 140"
        className="stroke-accent/55"
        strokeWidth="1.1"
        strokeDasharray="4 4"
        markerEnd="url(#dag-flow-arrow)"
      />

      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height="46"
            rx="8"
            className={
              node.id === "truth"
                ? "fill-accent/10 stroke-accent"
                : "fill-background stroke-border"
            }
            strokeWidth={node.id === "truth" ? 1.5 : 1}
          />
          <text
            x={node.x + node.w / 2}
            y={node.y + 28}
            textAnchor="middle"
            className={
              node.id === "truth"
                ? "fill-accent text-[12px] font-mono font-semibold"
                : "fill-foreground text-[12px] font-mono font-semibold"
            }
          >
            {node.label}
          </text>
        </g>
      ))}

      <g>
        <rect
          x="268"
          y="140"
          width="576"
          height="68"
          rx="8"
          className="fill-transparent stroke-accent/30"
          strokeWidth="1"
          strokeDasharray="5 4"
        />
        <line
          x1="296"
          y1="166"
          x2="824"
          y2="166"
          className="stroke-accent/35"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <rect
          x="354"
          y="146"
          width="260"
          height="42"
          rx="7"
          className="fill-transparent stroke-muted-foreground/45"
          strokeWidth="0.9"
          strokeDasharray="4 3"
        />
        <text
          x="484"
          y="151"
          textAnchor="middle"
          className="fill-muted-foreground/55 text-[7px] font-mono"
        >
          dag node scope
        </text>
        {[
          { label: "task_init", x: 296, kind: "anchor" },
          { label: "node_init", x: 390, kind: "anchor" },
          { label: "entries", x: 484, kind: "entry" },
          { label: "node_fin", x: 578, kind: "anchor" },
          { label: "task_checkpoint", x: 672, kind: "anchor" },
          { label: "{...}", x: 748, kind: "ellipsis" },
          { label: "task_fin", x: 824, kind: "anchor" },
        ].map((anchor) => (
          <g key={anchor.label}>
            {anchor.kind === "anchor" ? (
              <circle
                cx={anchor.x}
                cy="166"
                r="16"
                className="fill-accent/10 stroke-accent"
                strokeWidth="1"
              />
            ) : anchor.kind === "entry" ? (
              <rect
                x={anchor.x - 20}
                y="154"
                width="40"
                height="24"
                rx="5"
                className="fill-card stroke-border"
                strokeWidth="0.8"
              />
            ) : (
              <text
                x={anchor.x}
                y="169"
                textAnchor="middle"
                className="fill-muted-foreground/60 text-[12px] font-mono font-semibold"
              >
                {anchor.label}
              </text>
            )}
            {anchor.kind !== "ellipsis" && (
              <text
                x={anchor.x}
                y="169"
                textAnchor="middle"
                className={
                  anchor.kind === "anchor"
                    ? "fill-accent text-[8px] font-mono font-semibold"
                    : "fill-muted-foreground text-[8px] font-mono font-semibold"
                }
              >
                {anchor.kind === "anchor" ? "A" : "e*"}
              </text>
            )}
            <text
              x={anchor.x}
              y="194"
              textAnchor="middle"
              className="fill-muted-foreground text-[8px] font-mono"
            >
              {anchor.kind === "ellipsis" ? "dag.node*" : anchor.label}
            </text>
          </g>
        ))}
      </g>

      <g>
        <rect
          x="270"
          y="16"
          width="494"
          height="48"
          rx="8"
          className="fill-transparent stroke-muted-foreground/35"
          strokeWidth="1"
          strokeDasharray="5 4"
        />
        {["dag.node#0", "dag.node#1", "dag.node#2", "dag.node#3"].map(
          (label, index) => {
            const x = 294 + index * 116;
            return (
              <g key={label}>
                <rect
                  x={x}
                  y="30"
                  width="82"
                  height="22"
                  rx="5"
                  className="fill-card stroke-border"
                  strokeWidth="0.8"
                />
                <text
                  x={x + 41}
                  y="45"
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px] font-mono"
                >
                  {label}
                </text>
                {index < 3 && (
                  <line
                    x1={x + 86}
                    y1="41"
                    x2={x + 110}
                    y2="41"
                    className="stroke-muted-foreground/45"
                    strokeWidth="1"
                    markerEnd="url(#dag-flow-arrow)"
                  />
                )}
              </g>
            );
          }
        )}
      </g>

    </svg>
  );
}
