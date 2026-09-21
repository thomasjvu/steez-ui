"use client";

import {
  ErrorMessage,
  HeartbeatPulse,
  LoadingProgressBar,
  MarqueeStrip,
  OverlayButton,
  StatCard,
  StatusMessage,
} from "@steez-ui/ui";
import {
  LoadingOverlayCrystalline,
  QuickInfoCard,
  WidgetCard,
} from "@steez-ui/ui/blocks";
import { EyeIcon, InfoIcon, RefreshIcon } from "@steez-ui/icons";

import styles from "../component-docs.module.css";

export function LoadingProgressBarPreview() {
  return <LoadingProgressBar progress={72} valueLabel="72% synced" />;
}

export function LoadingOverlayCrystallinePreview() {
  return (
    <div className={styles.loadingOverlayPreview}>
      <div className={styles.loadingOverlayCanvas} />
      <LoadingOverlayCrystalline
        message="Preparing avatar"
        subtext="Loading model assets"
        icon={<RefreshIcon width={18} height={18} />}
      />
    </div>
  );
}

export function StatusMessagePreview() {
  return (
    <div className={styles.previewColumn}>
      <StatusMessage type="success" message="Registry payloads generated." />
      <StatusMessage type="info" message="Packages are ready to install." />
    </div>
  );
}

export function ErrorMessagePreview() {
  return (
    <ErrorMessage
      variant="inline"
      title="Build failed"
      message="Registry generation could not finish."
      details="The component catalog and payload manifest are out of sync."
      onRetry={() => undefined}
    />
  );
}

export function HeartbeatPulsePreview() {
  return (
    <div className={styles.previewColumn}>
      <HeartbeatPulse variant="orb" />
      <HeartbeatPulse variant="line" width={220} height={80} />
    </div>
  );
}

export function QuickInfoCardPreview() {
  return (
    <QuickInfoCard
      items={[
        {
          icon: <InfoIcon width={18} height={18} />,
          label: "Status",
          value: "Live",
          valueColor: "success",
        },
        {
          icon: <RefreshIcon width={18} height={18} />,
          label: "Requests",
          value: "1,024",
          mono: true,
        },
      ]}
      storageProgress={{ used: 2_760_000, limit: 8_000_000 }}
    />
  );
}

export function MarqueeStripPreview() {
  return (
    <MarqueeStrip
      items={[
        { kind: "Skill", label: "Persona pack" },
        { kind: "Theme", label: "Chronicle site kit" },
        { kind: "Workflow", label: "Launch approvals" },
      ]}
      durationSeconds={12}
      gap="0.55rem"
      className={styles.marqueeDemo}
      renderItem={(item) => (
        <span className={styles.marqueeItem}>
          <span className={styles.marqueeItemKind}>{item.kind}</span>
          <span>{item.label}</span>
        </span>
      )}
    />
  );
}

export function WidgetCardPreview() {
  return (
    <div className={styles.widgetPreviewGrid}>
      <WidgetCard
        title="Scene"
        size="xs-a"
        icon={<EyeIcon width={18} height={18} />}
        overlay={
          <div className={styles.widgetOverlay}>
            <OverlayButton aria-label="Inspect">
              <InfoIcon width={14} height={14} />
            </OverlayButton>
          </div>
        }
      >
        <p className={styles.previewText}>
          Reusable admin widget shell for viewer and dashboard grids.
        </p>
      </WidgetCard>
      <WidgetCard title="Queue" size="xs-a">
        <StatCard label="Jobs" value="12" subvalue="3 active" />
      </WidgetCard>
    </div>
  );
}

export function StatCardPreview() {
  return (
    <div className={styles.statPreviewGrid}>
      <StatCard label="Messages" value="1,248" subvalue="+12% this week" />
      <StatCard label="Queue" value="3" color="warning" />
      <StatCard label="Errors" value="0" color="success" />
    </div>
  );
}
