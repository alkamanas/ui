import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

function OtpDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <InputOTP
      className={className}
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
      "id": "input-otp-default",
      "title": "Default OTP slots",
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
      "id": "input-otp-utilities",
      "title": "Utility assigned border and gradient",
      "description": "OTP supports the same class-driven border and spotlight color controls used by bordered fields.",
      "preview": (
        <div className="grid w-full gap-5 overflow-x-auto pb-2">
          <OtpDemo className="border-animation-primary" />
          <OtpDemo className="gradient-primary/50" />
        </div>
      ),
      "code": `import { InputOTP } from "@alkamanas/ui";

export function UtilityInputOTPExample() {
  return (
    <InputOTP
      className="gradient-primary/50 border-animation-primary"
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
    "The component inherits theme, default border animation, default gradient and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Input OTP treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to dark/light section and glass mode changes from the docs selector. Primary is opt-in through utility classes."
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
      "description": "Merged onto the visible root. Use utilities such as gradient-primary/50 and border-animation-primary to assign gradient and focus colors."
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
    "--alka-gradient-color",
    "--alka-gradient-opacity",
    "--alka-border-animation-color",
    "--alka-border-animation-opacity",
    "--alka-panel-bg"
  ]
};

export function InputOTPPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
