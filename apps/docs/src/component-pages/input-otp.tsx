import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

function OtpDemo({
  borderAnimationColor,
  surfaceGradientColor,
}: {
  borderAnimationColor?: "primary" | "contrast";
  surfaceGradientColor?: "primary" | "contrast";
}) {
  return (
    <InputOTP
      borderAnimationColor={borderAnimationColor}
      surfaceGradientColor={surfaceGradientColor}
      maxLength={6}
    >
      <InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
        <InputOTPSeparator />
        {[3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

const details: ComponentPageDetails = {
  "summary": "Input OTP is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "input-otp-primary",
      "title": "Primary OTP slots",
      "description": "Each slot follows the bordered input style independently so focus and fill states stay visible per digit.",
      "preview": (
        <div className="w-full overflow-x-auto pb-2">
          <OtpDemo />
        </div>
      ),
      "code": `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@alkamanas/ui";

export function InputOTPExample() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
        <InputOTPSeparator />
        {[3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}`
    },
    {
      "id": "input-otp-contrast",
      "title": "Contrast border and gradient",
      "description": "OTP supports the same per-component border and spotlight color controls used by bordered fields.",
      "preview": (
        <div className="grid w-full gap-5 overflow-x-auto pb-2">
          <OtpDemo borderAnimationColor="contrast" />
          <OtpDemo surfaceGradientColor="contrast" />
        </div>
      ),
      "code": `import { InputOTP } from "@alkamanas/ui";

export function ContrastInputOTPExample() {
  return (
    <InputOTP
      borderAnimationColor="contrast"
      surfaceGradientColor="contrast"
      maxLength={6}
    >
      {/* Compose InputOTPGroup, InputOTPSlot and InputOTPSeparator here. */}
    </InputOTP>
  );
}`
    }
  ],
  "anatomy": [
    "Import InputOTP from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Input OTP treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to primary color, dark/light section and glass mode changes from the docs selector."
    }
  ],
  "sizes": [
    {
      "name": "content",
      "description": "Uses intrinsic sizing unless a fixed control size is documented for this component."
    },
    {
      "name": "responsive",
      "description": "Keeps text and controls within their parent bounds on mobile and desktop layouts."
    }
  ],
  "props": [
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root when the primitive renders one."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Used for composition in compound primitives."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Motion uses --alka-motion-* and --alka-ease-* tokens and should respect prefers-reduced-motion.",
    "Open, close, hover and focus states avoid layout shift by keeping stable dimensions."
  ],
  "tokens": [
    "--alka-ease-smooth",
    "--alka-radius-control",
    "--alka-panel-bg"
  ]
};

export function InputOTPPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
