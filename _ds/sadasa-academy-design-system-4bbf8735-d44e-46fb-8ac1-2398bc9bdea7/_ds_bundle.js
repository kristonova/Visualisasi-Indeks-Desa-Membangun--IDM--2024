/* @ds-bundle: {"format":4,"namespace":"SADASAAcademyDesignSystem_4bbf87","components":[{"name":"AccentRing","sourcePath":"components/brand/AccentRing.jsx"},{"name":"IconChip","sourcePath":"components/brand/IconChip.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"ServiceIcon","sourcePath":"components/brand/ServiceIcon.jsx"},{"name":"AccentRule","sourcePath":"components/core/AccentRule.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SectionTitle","sourcePath":"components/core/SectionTitle.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"CourseCard","sourcePath":"components/data/CourseCard.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/AccentRing.jsx":"c65ee7705b11","components/brand/IconChip.jsx":"f093be14b9d0","components/brand/Logo.jsx":"085a89f478c3","components/brand/ServiceIcon.jsx":"4c060f645a33","components/core/AccentRule.jsx":"789c2f1c4d28","components/core/Badge.jsx":"d5fc666cc486","components/core/Button.jsx":"46cb11b63388","components/core/Card.jsx":"a7767f93d781","components/core/IconButton.jsx":"8d3bf3709c6c","components/core/SectionTitle.jsx":"754500a96761","components/core/Tag.jsx":"7a1a8eb474f9","components/data/CourseCard.jsx":"cf37006d9160","components/data/DataTable.jsx":"bd3c7c30aed0","components/data/StatCard.jsx":"9793de41e05f","components/feedback/Alert.jsx":"71f76edea793","components/feedback/ProgressBar.jsx":"23865d25a697","components/forms/Checkbox.jsx":"bfd9b44f91af","components/forms/Input.jsx":"1edd6b07c692","components/forms/Radio.jsx":"cc49d57828c8","components/forms/Select.jsx":"2300461b6e84","components/forms/Switch.jsx":"f988f0efcd13","components/navigation/Breadcrumb.jsx":"b9b382b333ab","components/navigation/Tabs.jsx":"037c140e631f","slides/frame.jsx":"d5584e5919e4","ui_kits/stationery/Stationery.jsx":"ae961b946bfb","ui_kits/video_learning/App.jsx":"ffc85c674094","ui_kits/video_learning/Catalog.jsx":"3dfc2edc8fe7","ui_kits/video_learning/Dashboard.jsx":"c85170ad8466","ui_kits/video_learning/Login.jsx":"780b9c637d85","ui_kits/video_learning/Player.jsx":"7c6dfb26a52d","ui_kits/video_learning/Services.jsx":"08d432e0d2a2","ui_kits/video_learning/data.js":"580231734148"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SADASAAcademyDesignSystem_4bbf87 = window.SADASAAcademyDesignSystem_4bbf87 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/AccentRing.jsx
try { (() => {
function AccentRing({
  strength = 'default',
  size = '120%',
  position = 'bottom-right',
  rotate = 0,
  assetBase = '',
  style,
  ...rest
}) {
  const file = {
    faint: 'accent-ring-faint.png',
    default: 'accent-ring.png',
    strong: 'accent-ring-strong.png'
  }[strength];
  const anchors = {
    'bottom-right': {
      bottom: '-40%',
      right: '-42%'
    },
    'bottom-left': {
      bottom: '-40%',
      left: '-42%'
    },
    'top-right': {
      top: '-40%',
      right: '-42%'
    },
    'top-left': {
      top: '-40%',
      left: '-42%'
    },
    'right': {
      top: '50%',
      right: '-38%',
      transform: 'translateY(-50%)'
    },
    'center': {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  };
  const a = anchors[position] || anchors['bottom-right'];
  const tr = [a.transform, rotate ? 'rotate(' + rotate + 'deg)' : null].filter(Boolean).join(' ');
  return React.createElement('img', {
    src: assetBase + 'assets/motif/' + file,
    alt: '',
    'aria-hidden': true,
    style: {
      position: 'absolute',
      width: size,
      maxWidth: 'none',
      pointerEvents: 'none',
      userSelect: 'none',
      ...a,
      transform: tr || undefined,
      ...style
    },
    ...rest
  });
}
Object.assign(__ds_scope, { AccentRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AccentRing.jsx", error: String((e && e.message) || e) }); }

// components/brand/IconChip.jsx
try { (() => {
function IconChip({
  size = 28,
  tone = 'red',
  square = false,
  style,
  children,
  ...rest
}) {
  const tones = {
    red: ['var(--sadasa-red)', 'var(--n-0)'],
    gold: ['var(--accent-2)', 'var(--text-on-gold)'],
    ink: ['var(--n-800)', 'var(--n-0)'],
    soft: ['var(--red-50)', 'var(--red-700)'],
    white: ['var(--n-0)', 'var(--red-700)']
  };
  const [bg, fg] = tones[tone];
  return React.createElement('span', {
    style: {
      display: 'inline-grid',
      placeItems: 'center',
      width: size,
      height: size,
      flex: 'none',
      borderRadius: square ? 'var(--radius-sm)' : 'var(--radius-circle)',
      background: bg,
      color: fg,
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { IconChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/IconChip.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function Logo({
  variant = 'red',
  orientation = 'horizontal',
  height = 40,
  assetBase = '',
  src,
  alt = 'SADASA Academy',
  style,
  ...rest
}) {
  const file = orientation === 'mark' ? 'assets/logo/sadasa-mark-' + (variant === 'white' ? 'white' : 'red') + '.png' : 'assets/logo/sadasa-logo-' + (variant === 'white' ? 'white' : 'red') + '-' + orientation + '.png';
  return React.createElement('img', {
    src: src || assetBase + file,
    alt,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    },
    ...rest
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/ServiceIcon.jsx
try { (() => {
const serviceFiles = {
  'video-learning': 'product-play.png',
  training: 'product-growth.png',
  consulting: 'product-tuning.png',
  analytics: 'product-insight.png',
  engineering: 'product-code.png',
  research: 'product-conversation.png',
  'digitalent-bridge': 'digitalent-bridge.png'
};
function ServiceIcon({
  name = 'video-learning',
  size = 48,
  label,
  assetBase = '',
  style,
  ...rest
}) {
  const file = serviceFiles[name] || serviceFiles['video-learning'];
  const img = React.createElement('img', {
    src: assetBase + 'assets/icons/' + file,
    alt: label || name,
    style: {
      height: size,
      width: 'auto',
      display: 'block',
      objectFit: 'contain'
    }
  });
  if (!label) return React.createElement('span', {
    style: {
      display: 'inline-flex',
      ...style
    },
    ...rest
  }, img);
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--space-3)',
      ...style
    },
    ...rest
  }, img, React.createElement('span', {
    style: {
      fontSize: 'var(--text-micro)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { ServiceIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ServiceIcon.jsx", error: String((e && e.message) || e) }); }

// components/core/AccentRule.jsx
try { (() => {
function AccentRule({
  width = 44,
  thickness,
  tone = 'red',
  align = 'left',
  style,
  ...rest
}) {
  const colors = {
    red: 'var(--sadasa-red)',
    gold: 'var(--accent-2)',
    ink: 'var(--n-800)',
    hairline: 'var(--border-hairline)'
  };
  return React.createElement('div', {
    style: {
      width,
      borderTop: (thickness || 'var(--rule-accent)') + ' solid ' + colors[tone],
      margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : 0,
      ...style
    },
    ...rest
  });
}
Object.assign(__ds_scope, { AccentRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AccentRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const badgeTones = {
  red: {
    solid: ['var(--accent)', 'var(--text-on-brand)'],
    soft: ['var(--red-50)', 'var(--red-700)'],
    outline: ['transparent', 'var(--text-brand)', 'var(--border-brand)']
  },
  gold: {
    solid: ['var(--accent-2)', 'var(--text-on-gold)'],
    soft: ['var(--gold-100)', 'var(--gold-800)'],
    outline: ['transparent', 'var(--gold-800)', 'var(--gold-400)']
  },
  ink: {
    solid: ['var(--n-800)', 'var(--n-0)'],
    soft: ['var(--n-100)', 'var(--n-800)'],
    outline: ['transparent', 'var(--text-strong)', 'var(--border-strong)']
  },
  neutral: {
    solid: ['var(--n-500)', 'var(--n-0)'],
    soft: ['var(--n-100)', 'var(--text-body)'],
    outline: ['transparent', 'var(--text-muted)', 'var(--border-hairline)']
  },
  success: {
    solid: ['var(--status-success)', 'var(--n-0)'],
    soft: ['var(--status-success-soft)', 'var(--status-success)'],
    outline: ['transparent', 'var(--status-success)', 'var(--status-success)']
  },
  info: {
    solid: ['var(--status-info)', 'var(--n-0)'],
    soft: ['var(--status-info-soft)', 'var(--status-info)'],
    outline: ['transparent', 'var(--status-info)', 'var(--status-info)']
  }
};
function Badge({
  tone = 'red',
  variant = 'soft',
  size = 'md',
  uppercase = false,
  dot = false,
  style,
  children,
  ...rest
}) {
  const [bg, fg, bd] = badgeTones[tone][variant];
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    background: bg,
    color: fg,
    border: '1px solid ' + (bd || 'transparent'),
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: size === 'sm' ? 'var(--text-micro)' : 'var(--text-caption)',
    lineHeight: 1,
    padding: size === 'sm' ? '4px 8px' : '5px 11px',
    letterSpacing: uppercase ? 'var(--tracking-wide)' : '0.01em',
    textTransform: uppercase ? 'uppercase' : 'none',
    whiteSpace: 'nowrap',
    ...style
  };
  return React.createElement('span', {
    style: css,
    ...rest
  }, dot ? React.createElement('span', {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-circle)',
      background: 'currentColor',
      flex: 'none'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: '0.01em',
  lineHeight: 1,
  borderRadius: 'var(--radius-sm)',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'var(--transition-control)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  WebkitTapHighlightColor: 'transparent'
};
const btnSizes = {
  sm: {
    fontSize: 'var(--text-body-sm)',
    padding: '0 12px',
    height: 32
  },
  md: {
    fontSize: 'var(--text-body)',
    padding: '0 18px',
    height: 40
  },
  lg: {
    fontSize: 'var(--text-body-lg)',
    padding: '0 24px',
    height: 48
  }
};
function btnSkin(variant, hover, press) {
  const s = {};
  if (variant === 'primary') {
    s.background = press ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)';
    s.color = 'var(--text-on-brand)';
    s.boxShadow = 'var(--shadow-inset-top)';
  } else if (variant === 'secondary') {
    s.background = press ? 'var(--n-950)' : hover ? 'var(--n-900)' : 'var(--n-800)';
    s.color = 'var(--n-0)';
  } else if (variant === 'gold') {
    s.background = press ? 'var(--accent-2-press)' : hover ? 'var(--accent-2-hover)' : 'var(--accent-2)';
    s.color = 'var(--text-on-gold)';
  } else if (variant === 'outline') {
    s.background = press ? 'var(--accent-soft-hover)' : hover ? 'var(--accent-soft)' : 'transparent';
    s.color = 'var(--text-brand)';
    s.borderColor = hover ? 'var(--accent)' : 'var(--border-brand)';
  } else if (variant === 'ghost') {
    s.background = press ? 'var(--accent-soft-hover)' : hover ? 'var(--accent-soft)' : 'transparent';
    s.color = hover ? 'var(--text-brand)' : 'var(--text-body)';
  } else if (variant === 'inverse') {
    s.background = press ? 'var(--n-200)' : hover ? 'var(--n-50)' : 'var(--n-0)';
    s.color = 'var(--red-700)';
  }
  return s;
}
function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  fullWidth = false,
  disabled = false,
  href,
  type = 'button',
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const skin = disabled ? {
    background: variant === 'ghost' || variant === 'outline' ? 'transparent' : 'var(--n-100)',
    color: 'var(--text-subtle)',
    borderColor: variant === 'outline' ? 'var(--border-hairline)' : 'transparent',
    boxShadow: 'none'
  } : btnSkin(variant, hover, press);
  const css = {
    ...btnBase,
    ...btnSizes[size],
    ...skin,
    width: fullWidth ? '100%' : undefined,
    transform: !disabled && press ? 'scale(var(--press-scale))' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style
  };
  const bind = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  };
  return React.createElement(Tag, {
    style: css,
    href: disabled ? undefined : href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    'aria-disabled': disabled || undefined,
    onClick: disabled ? undefined : onClick,
    ...bind,
    ...rest
  }, iconStart ? React.createElement('span', {
    style: {
      display: 'inline-flex',
      flex: 'none'
    },
    'aria-hidden': true
  }, iconStart) : null, children ? React.createElement('span', null, children) : null, iconEnd ? React.createElement('span', {
    style: {
      display: 'inline-flex',
      flex: 'none'
    },
    'aria-hidden': true
  }, iconEnd) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  variant = 'outline',
  padding = 'default',
  interactive = false,
  as = 'div',
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pads = {
    none: 0,
    tight: 'var(--pad-card-tight)',
    default: 'var(--pad-card)'
  };
  const shadows = {
    flat: 'none',
    outline: 'none',
    raised: 'var(--shadow-1)'
  };
  const css = {
    background: 'var(--surface-card)',
    border: variant === 'flat' ? '1px solid transparent' : '1px solid var(--border-hairline)',
    borderRadius: 'var(--radius-md)',
    padding: pads[padding],
    boxShadow: interactive && hover ? 'var(--shadow-2)' : shadows[variant],
    transform: interactive && hover ? 'var(--lift-hover)' : 'none',
    transition: 'var(--transition-control)',
    cursor: interactive ? 'pointer' : undefined,
    ...style
  };
  const bind = interactive ? {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  } : {};
  return React.createElement(as, {
    style: css,
    ...bind,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const ibSizes = {
  sm: 28,
  md: 36,
  lg: 44
};
const ibIcon = {
  sm: 15,
  md: 18,
  lg: 20
};
function IconButton({
  label,
  variant = 'ghost',
  size = 'md',
  round = false,
  disabled = false,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const d = ibSizes[size];
  let skin = {};
  if (variant === 'solid') {
    skin = {
      background: press ? 'var(--accent-press)' : hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--text-on-brand)'
    };
  } else if (variant === 'outline') {
    skin = {
      background: hover ? 'var(--accent-soft)' : 'transparent',
      color: 'var(--text-brand)',
      borderColor: 'var(--border-brand)'
    };
  } else {
    skin = {
      background: press ? 'var(--accent-soft-hover)' : hover ? 'var(--accent-soft)' : 'transparent',
      color: hover ? 'var(--text-brand)' : 'var(--text-muted)'
    };
  }
  if (disabled) skin = {
    background: 'transparent',
    color: 'var(--text-subtle)',
    borderColor: variant === 'outline' ? 'var(--border-hairline)' : 'transparent'
  };
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: d,
    height: d,
    flex: 'none',
    padding: 0,
    border: '1px solid transparent',
    borderRadius: round ? 'var(--radius-circle)' : 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-control)',
    transform: !disabled && press ? 'scale(var(--press-scale))' : 'none',
    ...skin,
    ...style
  };
  const bind = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  };
  return React.createElement('button', {
    type: 'button',
    'aria-label': label,
    title: label,
    disabled,
    onClick: disabled ? undefined : onClick,
    style: css,
    ...bind,
    ...rest
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      width: ibIcon[size],
      height: ibIcon[size]
    },
    'aria-hidden': true
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionTitle.jsx
try { (() => {
function SectionTitle({
  eyebrow,
  title,
  subtitle,
  size = 'md',
  align = 'left',
  rule = true,
  inverse = false,
  style,
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      title: 'var(--text-h3)',
      weight: 'var(--fw-bold)'
    },
    md: {
      title: 'var(--text-h1)',
      weight: 'var(--fw-bold)'
    },
    lg: {
      title: 'var(--text-display-3)',
      weight: 'var(--fw-extrabold)'
    }
  };
  const s = sizes[size];
  return React.createElement('div', {
    style: {
      textAlign: align,
      ...style
    },
    ...rest
  }, eyebrow ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-micro)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--gold-500)' : 'var(--text-brand)'
    }
  }, eyebrow) : null, rule ? React.createElement('div', {
    style: {
      width: 44,
      borderTop: 'var(--rule-accent) solid ' + (inverse ? 'var(--gold-500)' : 'var(--sadasa-red)'),
      margin: align === 'center' ? '10px auto' : '10px 0 0'
    }
  }) : null, title ? React.createElement('h2', {
    style: {
      fontSize: s.title,
      fontWeight: s.weight,
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 'var(--lh-snug)',
      color: inverse ? 'var(--n-0)' : 'var(--text-strong)',
      margin: '10px 0 0'
    }
  }, title) : null, subtitle ? React.createElement('p', {
    style: {
      fontSize: 'var(--text-body-lg)',
      fontWeight: 'var(--fw-light)',
      color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
      margin: '6px 0 0',
      maxWidth: 'var(--measure-prose)',
      marginLeft: align === 'center' ? 'auto' : undefined,
      marginRight: align === 'center' ? 'auto' : undefined
    }
  }, subtitle) : null, children);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
const tagTones = {
  basic: ['var(--gold-100)', 'var(--gold-800)', 'var(--gold-300)'],
  intermediate: ['var(--red-50)', 'var(--red-700)', 'var(--red-200)'],
  advance: ['var(--n-900)', 'var(--n-0)', 'var(--n-900)'],
  neutral: ['var(--surface-card)', 'var(--text-body)', 'var(--border-hairline)'],
  red: ['var(--red-50)', 'var(--red-700)', 'var(--red-200)'],
  gold: ['var(--gold-50)', 'var(--gold-800)', 'var(--gold-300)']
};
function Tag({
  tone = 'neutral',
  size = 'md',
  selected = false,
  onRemove,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [bg, fg, bd] = tagTones[tone];
  const clickable = !!onClick;
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    background: selected ? 'var(--n-900)' : clickable && hover ? 'var(--surface-sunken)' : bg,
    color: selected ? 'var(--n-0)' : fg,
    border: '1px solid ' + (selected ? 'var(--n-900)' : bd),
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-sans)',
    fontSize: size === 'sm' ? 'var(--text-micro)' : 'var(--text-body-sm)',
    fontWeight: 'var(--fw-medium)',
    lineHeight: 1,
    padding: size === 'sm' ? '5px 10px' : '7px 14px',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'var(--transition-control)',
    ...style
  };
  return React.createElement(clickable ? 'button' : 'span', {
    type: clickable ? 'button' : undefined,
    style: css,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    'aria-pressed': clickable ? selected : undefined,
    ...rest
  }, children, onRemove ? React.createElement('span', {
    role: 'button',
    'aria-label': 'Hapus',
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      display: 'inline-flex',
      cursor: 'pointer',
      opacity: 0.65,
      fontSize: '1.1em',
      lineHeight: 1
    }
  }, '\u00d7') : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/CourseCard.jsx
try { (() => {
function CourseCard({
  title,
  level = 'Basic Course',
  videos,
  duration,
  topics = [],
  thumbnail,
  progress,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const levelTone = /advance/i.test(level) ? 'advance' : /intermediate/i.test(level) ? 'intermediate' : 'basic';
  return React.createElement('article', {
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      boxShadow: hover && onClick ? 'var(--shadow-2)' : 'none',
      transform: hover && onClick ? 'var(--lift-hover)' : 'none',
      transition: 'var(--transition-control)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    },
    ...rest
  }, thumbnail ? React.createElement('div', {
    style: {
      position: 'relative',
      aspectRatio: '16 / 9',
      overflow: 'hidden',
      background: 'var(--n-100)'
    }
  }, React.createElement('img', {
    src: thumbnail,
    alt: '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)',
      opacity: 0.9
    }
  }), React.createElement('span', {
    style: {
      position: 'absolute',
      left: 12,
      bottom: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--n-0)',
      fontSize: 'var(--text-micro)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, videos !== undefined ? videos + ' VIDEOS' : null, duration ? ' \u00b7 ' + duration : null)) : null, React.createElement('div', {
    style: {
      padding: 'var(--pad-card-tight)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      flex: 1
    }
  }, React.createElement(__ds_scope.Tag, {
    tone: levelTone,
    size: 'sm',
    style: {
      alignSelf: 'flex-start'
    }
  }, level), React.createElement('h3', {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--tracking-tight)',
      lineHeight: 'var(--lh-heading)',
      color: hover && onClick ? 'var(--text-brand)' : 'var(--text-strong)',
      transition: 'color var(--duration-fast) var(--ease-out)'
    }
  }, title), topics.length ? React.createElement('ul', {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, topics.map((t, i) => React.createElement('li', {
    key: i,
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      display: 'flex',
      gap: 8
    }
  }, React.createElement('span', {
    'aria-hidden': true,
    style: {
      color: 'var(--accent)'
    }
  }, '\u25cf'), t))) : null, !thumbnail && (videos !== undefined || duration) ? React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      marginTop: 'auto',
      paddingTop: 'var(--space-2)'
    }
  }, videos !== undefined ? React.createElement('span', {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, videos), React.createElement('span', {
    style: {
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, 'Videos')) : null, duration ? React.createElement('span', {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, duration), React.createElement('span', {
    style: {
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, 'Duration')) : null) : null, progress !== undefined ? React.createElement('div', {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-2)'
    }
  }, React.createElement('div', {
    style: {
      height: 4,
      background: 'var(--n-200)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      width: progress + '%',
      height: '100%',
      background: 'var(--accent)'
    }
  })), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-micro)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, progress + '% selesai')) : null));
}
Object.assign(__ds_scope, { CourseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CourseCard.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  dense = false,
  zebra = false,
  caption,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  const cellPad = dense ? '8px 12px' : '12px 14px';
  const th = {
    textAlign: 'left',
    fontSize: 'var(--text-micro)',
    fontWeight: 'var(--fw-bold)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    padding: cellPad,
    borderBottom: '1px solid var(--border-strong)',
    whiteSpace: 'nowrap'
  };
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      ...style
    },
    ...rest
  }, React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, caption ? React.createElement('caption', {
    style: {
      captionSide: 'top',
      textAlign: 'left',
      padding: cellPad,
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, caption) : null, React.createElement('thead', null, React.createElement('tr', null, columns.map((c, i) => React.createElement('th', {
    key: i,
    style: {
      ...th,
      textAlign: c.align || 'left'
    }
  }, c.header || c)))), React.createElement('tbody', null, rows.map((r, ri) => React.createElement('tr', {
    key: ri,
    onMouseEnter: () => setHover(ri),
    onMouseLeave: () => setHover(null),
    style: {
      background: hover === ri ? 'var(--surface-sunken)' : zebra && ri % 2 ? 'var(--n-25)' : 'transparent',
      transition: 'background-color var(--duration-fast) var(--ease-out)'
    }
  }, columns.map((c, ci) => {
    const key = c.key || c;
    const v = Array.isArray(r) ? r[ci] : r[key];
    const numeric = c.numeric;
    return React.createElement('td', {
      key: ci,
      style: {
        padding: cellPad,
        fontSize: 'var(--text-body-sm)',
        color: ci === 0 ? 'var(--text-strong)' : 'var(--text-body)',
        fontWeight: ci === 0 ? 'var(--fw-medium)' : 'var(--fw-regular)',
        fontFamily: numeric ? 'var(--font-mono)' : 'inherit',
        textAlign: c.align || (numeric ? 'right' : 'left'),
        borderBottom: ri === rows.length - 1 ? 'none' : '1px solid var(--border-hairline)',
        fontVariantNumeric: numeric ? 'tabular-nums' : undefined
      }
    }, v);
  }))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function StatCard({
  value,
  unit,
  label,
  caption,
  tone = 'paper',
  align = 'left',
  icon,
  style,
  ...rest
}) {
  const tones = {
    paper: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      color: 'var(--text-strong)',
      sub: 'var(--text-muted)'
    },
    gold: {
      background: 'var(--gold-100)',
      border: '1px solid var(--gold-200)',
      color: 'var(--red-950)',
      sub: 'var(--gold-800)'
    },
    brand: {
      background: 'var(--surface-brand-deep)',
      border: '1px solid transparent',
      color: 'var(--n-0)',
      sub: 'oklch(1 0 0 / 0.68)'
    },
    ink: {
      background: 'var(--red-950)',
      border: '1px solid transparent',
      color: 'var(--n-0)',
      sub: 'oklch(1 0 0 / 0.62)'
    }
  };
  const t = tones[tone];
  return React.createElement('div', {
    style: {
      background: t.background,
      border: t.border,
      borderRadius: 'var(--radius-md)',
      padding: 'var(--pad-card)',
      textAlign: align,
      ...style
    },
    ...rest
  }, icon ? React.createElement('div', {
    style: {
      marginBottom: 'var(--space-3)',
      color: t.color,
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, icon) : null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-display-3)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1,
      color: t.color
    }
  }, value), unit ? React.createElement('span', {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--fw-semibold)',
      color: t.sub
    }
  }, unit) : null), label ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-micro)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: t.sub,
      marginTop: 'var(--space-3)'
    }
  }, label) : null, caption ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: t.sub,
      marginTop: 'var(--space-2)',
      lineHeight: 'var(--lh-normal)'
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const alertTones = {
  info: ['var(--status-info-soft)', 'var(--status-info)', 'var(--status-info)'],
  success: ['var(--status-success-soft)', 'var(--status-success)', 'var(--status-success)'],
  warning: ['var(--status-warning-soft)', 'var(--gold-800)', 'var(--gold-600)'],
  danger: ['var(--status-danger-soft)', 'var(--red-700)', 'var(--status-danger)'],
  brand: ['var(--surface-accent-soft)', 'var(--red-700)', 'var(--accent)']
};
function Alert({
  tone = 'info',
  title,
  icon,
  onDismiss,
  style,
  children,
  ...rest
}) {
  const [bg, fg, mark] = alertTones[tone];
  return React.createElement('div', {
    role: 'status',
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      background: bg,
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)',
      border: '1px solid transparent',
      ...style
    },
    ...rest
  }, React.createElement('span', {
    'aria-hidden': true,
    style: {
      flex: 'none',
      width: 4,
      alignSelf: 'stretch',
      borderRadius: 2,
      background: mark
    }
  }), icon ? React.createElement('span', {
    'aria-hidden': true,
    style: {
      flex: 'none',
      color: mark,
      display: 'inline-flex',
      marginTop: 1
    }
  }, icon) : null, React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--fw-semibold)',
      color: fg,
      marginBottom: children ? 4 : 0
    }
  }, title) : null, children ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-normal)'
    }
  }, children) : null), onDismiss ? React.createElement('button', {
    type: 'button',
    'aria-label': 'Tutup',
    onClick: onDismiss,
    style: {
      appearance: 'none',
      border: 0,
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: 16,
      lineHeight: 1,
      padding: 2,
      flex: 'none'
    }
  }, '\u00d7') : null);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value = 0,
  max = 100,
  label,
  valueLabel,
  tone = 'red',
  size = 'md',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const colors = {
    red: 'var(--accent)',
    gold: 'var(--accent-2)',
    ink: 'var(--n-800)'
  };
  const h = size === 'sm' ? 4 : size === 'lg' ? 10 : 6;
  return React.createElement('div', {
    style: {
      ...style
    },
    ...rest
  }, label || valueLabel ? React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 'var(--space-2)',
      gap: 'var(--space-4)'
    }
  }, label ? React.createElement('span', {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-body)'
    }
  }, label) : null, valueLabel ? React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, valueLabel) : null) : null, React.createElement('div', {
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    style: {
      height: h,
      background: 'var(--n-200)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      width: pct + '%',
      height: '100%',
      background: colors[tone],
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-base) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  onChange,
  id,
  style,
  ...rest
}) {
  const rid = React.useMemo(() => id || 'cb-' + Math.random().toString(36).slice(2, 8), [id]);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const isOn = checked !== undefined ? checked : undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = isOn !== undefined ? isOn : inner;
  const box = {
    position: 'relative',
    width: 18,
    height: 18,
    flex: 'none',
    borderRadius: 'var(--radius-xs)',
    border: '1px solid ' + (on || indeterminate ? 'var(--accent)' : 'var(--border-strong)'),
    background: disabled ? 'var(--n-100)' : on || indeterminate ? 'var(--accent)' : 'var(--surface-card)',
    transition: 'var(--transition-control)',
    display: 'grid',
    placeItems: 'center'
  };
  return React.createElement('label', {
    htmlFor: rid,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      marginTop: description ? 2 : 0
    }
  }, React.createElement('input', {
    ref,
    id: rid,
    type: 'checkbox',
    checked: isOn,
    defaultChecked,
    disabled,
    onChange: e => {
      if (isOn === undefined) setInner(e.target.checked);
      if (onChange) onChange(e);
    },
    style: {
      position: 'absolute',
      opacity: 0,
      width: 18,
      height: 18,
      margin: 0,
      cursor: 'inherit'
    },
    ...rest
  }), React.createElement('span', {
    style: box,
    'aria-hidden': true
  }, indeterminate ? React.createElement('span', {
    style: {
      width: 9,
      height: 2,
      background: 'var(--n-0)',
      borderRadius: 1
    }
  }) : on ? React.createElement('span', {
    style: {
      width: 5,
      height: 9,
      borderRight: '2px solid var(--n-0)',
      borderBottom: '2px solid var(--n-0)',
      transform: 'rotate(45deg) translate(-1px,-1px)'
    }
  }) : null)), React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-body)',
      color: disabled ? 'var(--text-subtle)' : 'var(--text-body)'
    }
  }, label), description ? React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const fieldLabel = {
  display: 'block',
  fontSize: 'var(--text-body-sm)',
  fontWeight: 'var(--fw-semibold)',
  color: 'var(--text-strong)',
  marginBottom: 'var(--space-2)'
};
const fieldHint = {
  fontSize: 'var(--text-caption)',
  color: 'var(--text-muted)',
  marginTop: 'var(--space-2)'
};
const fieldErr = {
  fontSize: 'var(--text-caption)',
  color: 'var(--status-danger)',
  marginTop: 'var(--space-2)',
  fontWeight: 'var(--fw-medium)'
};
function Input({
  label,
  hint,
  error,
  size = 'md',
  prefix,
  suffix,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const rid = React.useMemo(() => id || 'in-' + Math.random().toString(36).slice(2, 8), [id]);
  const h = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const shell = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    height: h,
    padding: '0 var(--pad-control-x)',
    background: disabled ? 'var(--n-50)' : 'var(--surface-card)',
    border: '1px solid ' + (error ? 'var(--status-danger)' : focus ? 'var(--accent)' : 'var(--border-hairline)'),
    borderRadius: 'var(--radius-sm)',
    boxShadow: focus ? 'var(--shadow-focus)' : 'none',
    transition: 'var(--transition-control)'
  };
  const input = {
    flex: 1,
    minWidth: 0,
    border: 0,
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)',
    color: disabled ? 'var(--text-subtle)' : 'var(--text-strong)'
  };
  const deco = {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--text-muted)',
    fontSize: 'var(--text-body-sm)',
    flex: 'none'
  };
  return React.createElement('div', {
    style: {
      ...style
    }
  }, label ? React.createElement('label', {
    htmlFor: rid,
    style: fieldLabel
  }, label) : null, React.createElement('div', {
    style: shell
  }, prefix ? React.createElement('span', {
    style: deco,
    'aria-hidden': true
  }, prefix) : null, React.createElement('input', {
    id: rid,
    disabled,
    style: input,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    'aria-invalid': error ? true : undefined,
    ...rest
  }), suffix ? React.createElement('span', {
    style: deco,
    'aria-hidden': true
  }, suffix) : null), error ? React.createElement('div', {
    style: fieldErr
  }, error) : hint ? React.createElement('div', {
    style: fieldHint
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  name,
  value,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  id,
  style,
  ...rest
}) {
  const rid = React.useMemo(() => id || 'rd-' + Math.random().toString(36).slice(2, 8), [id]);
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const ring = {
    position: 'relative',
    width: 18,
    height: 18,
    flex: 'none',
    borderRadius: 'var(--radius-circle)',
    border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-strong)'),
    background: disabled ? 'var(--n-100)' : 'var(--surface-card)',
    display: 'grid',
    placeItems: 'center',
    transition: 'var(--transition-control)'
  };
  return React.createElement('label', {
    htmlFor: rid,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      marginTop: description ? 2 : 0
    }
  }, React.createElement('input', {
    id: rid,
    type: 'radio',
    name,
    value,
    checked: checked,
    defaultChecked,
    disabled,
    onChange: e => {
      if (checked === undefined) setInner(e.target.checked);
      if (onChange) onChange(e);
    },
    style: {
      position: 'absolute',
      opacity: 0,
      width: 18,
      height: 18,
      margin: 0,
      cursor: 'inherit'
    },
    ...rest
  }), React.createElement('span', {
    style: ring,
    'aria-hidden': true
  }, on ? React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-circle)',
      background: 'var(--accent)'
    }
  }) : null)), React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-body)',
      color: disabled ? 'var(--text-subtle)' : 'var(--text-body)'
    }
  }, label), description ? React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const fieldLabel = {
  display: 'block',
  fontSize: 'var(--text-body-sm)',
  fontWeight: 'var(--fw-semibold)',
  color: 'var(--text-strong)',
  marginBottom: 'var(--space-2)'
};
const fieldHint = {
  fontSize: 'var(--text-caption)',
  color: 'var(--text-muted)',
  marginTop: 'var(--space-2)'
};
const fieldErr = {
  fontSize: 'var(--text-caption)',
  color: 'var(--status-danger)',
  marginTop: 'var(--space-2)',
  fontWeight: 'var(--fw-medium)'
};
function Select({
  label,
  hint,
  error,
  size = 'md',
  options = [],
  placeholder,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const rid = React.useMemo(() => id || 'se-' + Math.random().toString(36).slice(2, 8), [id]);
  const h = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const shell = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: h,
    background: disabled ? 'var(--n-50)' : 'var(--surface-card)',
    border: '1px solid ' + (error ? 'var(--status-danger)' : focus ? 'var(--accent)' : 'var(--border-hairline)'),
    borderRadius: 'var(--radius-sm)',
    boxShadow: focus ? 'var(--shadow-focus)' : 'none',
    transition: 'var(--transition-control)'
  };
  const sel = {
    appearance: 'none',
    WebkitAppearance: 'none',
    flex: 1,
    height: '100%',
    border: 0,
    outline: 'none',
    background: 'transparent',
    padding: '0 34px 0 var(--pad-control-x)',
    fontFamily: 'var(--font-sans)',
    fontSize: size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)',
    color: disabled ? 'var(--text-subtle)' : 'var(--text-strong)',
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
  return React.createElement('div', {
    style: {
      ...style
    }
  }, label ? React.createElement('label', {
    htmlFor: rid,
    style: fieldLabel
  }, label) : null, React.createElement('div', {
    style: shell
  }, React.createElement('select', {
    id: rid,
    disabled,
    style: sel,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    ...rest
  }, placeholder ? React.createElement('option', {
    value: '',
    disabled: true
  }, placeholder) : null, options.map(o => React.createElement('option', {
    key: typeof o === 'string' ? o : o.value,
    value: typeof o === 'string' ? o : o.value
  }, typeof o === 'string' ? o : o.label))), React.createElement('span', {
    'aria-hidden': true,
    style: {
      position: 'absolute',
      right: 12,
      width: 8,
      height: 8,
      borderRight: '2px solid var(--text-muted)',
      borderBottom: '2px solid var(--text-muted)',
      transform: 'rotate(45deg) translateY(-2px)',
      pointerEvents: 'none'
    }
  })), error ? React.createElement('div', {
    style: fieldErr
  }, error) : hint ? React.createElement('div', {
    style: fieldHint
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  description,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  size = 'md',
  id,
  style,
  ...rest
}) {
  const rid = React.useMemo(() => id || 'sw-' + Math.random().toString(36).slice(2, 8), [id]);
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const w = size === 'sm' ? 32 : 40,
    h = size === 'sm' ? 18 : 22,
    d = h - 4;
  const track = {
    width: w,
    height: h,
    flex: 'none',
    borderRadius: 'var(--radius-pill)',
    background: disabled ? 'var(--n-200)' : on ? 'var(--accent)' : 'var(--n-300)',
    position: 'relative',
    transition: 'background-color var(--duration-fast) var(--ease-out)'
  };
  const knob = {
    position: 'absolute',
    top: 2,
    left: on ? w - d - 2 : 2,
    width: d,
    height: d,
    borderRadius: 'var(--radius-circle)',
    background: 'var(--n-0)',
    boxShadow: 'var(--shadow-1)',
    transition: 'left var(--duration-fast) var(--ease-out)'
  };
  return React.createElement('label', {
    htmlFor: rid,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      position: 'relative',
      marginTop: description ? 2 : 0
    }
  }, React.createElement('input', {
    id: rid,
    type: 'checkbox',
    role: 'switch',
    checked: checked,
    defaultChecked,
    disabled,
    onChange: e => {
      if (checked === undefined) setInner(e.target.checked);
      if (onChange) onChange(e);
    },
    style: {
      position: 'absolute',
      opacity: 0,
      width: w,
      height: h,
      margin: 0,
      cursor: 'inherit'
    },
    ...rest
  }), React.createElement('span', {
    style: track,
    'aria-hidden': true
  }, React.createElement('span', {
    style: knob
  }))), label ? React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-body)',
      color: disabled ? 'var(--text-subtle)' : 'var(--text-body)'
    }
  }, label), description ? React.createElement('span', {
    style: {
      display: 'block',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items = [],
  separator = '/',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  return React.createElement('nav', {
    'aria-label': 'Breadcrumb',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap',
      ...style
    },
    ...rest
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    const label = it.label || it;
    return React.createElement(React.Fragment, {
      key: label + i
    }, React.createElement(last || !it.href ? 'span' : 'a', {
      href: last ? undefined : it.href,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        fontSize: 'var(--text-body-sm)',
        fontWeight: last ? 'var(--fw-semibold)' : 'var(--fw-regular)',
        color: last ? 'var(--text-strong)' : hover === i ? 'var(--text-brand)' : 'var(--text-muted)',
        textDecoration: 'none',
        borderBottom: 'none',
        transition: 'var(--transition-control)'
      },
      'aria-current': last ? 'page' : undefined
    }, label), last ? null : React.createElement('span', {
      'aria-hidden': true,
      style: {
        color: 'var(--text-subtle)',
        fontSize: 'var(--text-body-sm)'
      }
    }, separator));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  size = 'md',
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(defaultValue || items[0] && (items[0].value || items[0]));
  const active = value !== undefined ? value : inner;
  const [hover, setHover] = React.useState(null);
  const pick = v => {
    if (value === undefined) setInner(v);
    if (onChange) onChange(v);
  };
  const pad = size === 'sm' ? '7px 12px' : '10px 16px';
  const list = {
    display: 'flex',
    gap: variant === 'pill' ? 'var(--space-2)' : 'var(--space-6)',
    borderBottom: variant === 'underline' ? '1px solid var(--border-hairline)' : 'none',
    ...style
  };
  return React.createElement('div', {
    role: 'tablist',
    style: list,
    ...rest
  }, items.map(it => {
    const v = it.value || it,
      label = it.label || it,
      on = v === active,
      hv = hover === v;
    const base = {
      appearance: 'none',
      border: 0,
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: size === 'sm' ? 'var(--text-body-sm)' : 'var(--text-body)',
      fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
      color: on ? 'var(--text-strong)' : hv ? 'var(--text-brand)' : 'var(--text-muted)',
      padding: pad,
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)'
    };
    const skin = variant === 'pill' ? {
      background: on ? 'var(--n-900)' : hv ? 'var(--surface-sunken)' : 'transparent',
      color: on ? 'var(--n-0)' : base.color,
      borderRadius: 'var(--radius-pill)'
    } : {
      borderBottom: '2px solid ' + (on ? 'var(--sadasa-red)' : 'transparent'),
      marginBottom: -1,
      padding: size === 'sm' ? '7px 2px' : '10px 2px'
    };
    return React.createElement('button', {
      key: v,
      type: 'button',
      role: 'tab',
      'aria-selected': on,
      onClick: () => pick(v),
      onMouseEnter: () => setHover(v),
      onMouseLeave: () => setHover(null),
      style: {
        ...base,
        ...skin
      }
    }, label, it.count !== undefined ? React.createElement('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: on && variant === 'pill' ? 'var(--n-300)' : 'var(--text-subtle)'
      }
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// slides/frame.jsx
try { (() => {
(function () {
  const {
    Logo,
    AccentRing
  } = window.SADASAAcademyDesignSystem_4bbf87;
  const B = '../';
  function SlIcon({
    n,
    s = 18
  }) {
    const r = React.useRef(null);
    React.useEffect(() => {
      if (r.current && window.lucide) {
        r.current.innerHTML = '';
        const e = document.createElement('i');
        e.setAttribute('data-lucide', n);
        r.current.appendChild(e);
        window.lucide.createIcons({
          attrs: {
            width: s,
            height: s,
            'stroke-width': 2
          },
          nameAttr: 'data-lucide'
        });
      }
    }, [n, s]);
    return /*#__PURE__*/React.createElement("span", {
      ref: r,
      style: {
        display: 'inline-flex',
        width: s,
        height: s
      }
    });
  }
  function Slide({
    kicker,
    section,
    page,
    theme = 'paper',
    ring = null,
    children,
    pad = true,
    style
  }) {
    const ink = theme === 'ink' || theme === 'brand';
    const bg = theme === 'ink' ? 'var(--red-950)' : theme === 'brand' ? 'var(--red-800)' : 'var(--surface-page)';
    return /*#__PURE__*/React.createElement("div", {
      "data-theme": ink ? 'ink' : undefined,
      style: {
        position: 'relative',
        width: 1280,
        height: 720,
        background: bg,
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, ring && /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: B,
      strength: ink ? 'strong' : 'faint',
      position: ring,
      size: "820px",
      style: ink ? {
        opacity: 0.16
      } : null
    }), kicker && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 34,
        left: 72,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: ink ? 'var(--gold-500)' : 'var(--text-brand)'
      }
    }, kicker), section && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 34,
        right: 72,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: ink ? 'oklch(1 0 0 / 0.5)' : 'var(--text-subtle)'
      }
    }, section), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: pad ? '80px 72px 78px' : 0
      }
    }, children), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 30,
        right: 72,
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: ink ? 'white' : 'red',
      orientation: "mark",
      assetBase: B,
      height: 22
    }), page && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: ink ? 'oklch(1 0 0 / 0.5)' : 'var(--text-subtle)'
      }
    }, page)));
  }
  function SlideTitle({
    eyebrow,
    title,
    sub,
    inverse,
    size = 'md',
    style
  }) {
    const fs = {
      sm: 'var(--text-h2)',
      md: 'var(--text-display-3)',
      lg: 'var(--text-display-2)'
    }[size];
    return /*#__PURE__*/React.createElement("div", {
      style: style
    }, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: inverse ? 'var(--gold-500)' : 'var(--text-brand)'
      }
    }, eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        borderTop: '3px solid ' + (inverse ? 'var(--gold-500)' : 'var(--sadasa-red)'),
        margin: '12px 0 14px'
      }
    }), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: fs,
        fontWeight: 800,
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1.05,
        margin: 0,
        color: inverse ? 'var(--n-0)' : 'var(--text-strong)'
      }
    }, title), sub && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-h4)',
        fontWeight: 300,
        color: inverse ? 'oklch(1 0 0 / 0.72)' : 'var(--text-muted)',
        margin: '14px 0 0',
        maxWidth: '46ch'
      }
    }, sub));
  }
  function Bars({
    data,
    max,
    height = 260
  }) {
    const m = max || Math.max(...data.map(d => d.v));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 22,
        height,
        borderBottom: '1px solid var(--chart-grid)',
        paddingBottom: 0
      }
    }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
      key: d.l,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)',
        marginBottom: 8
      }
    }, d.t || d.v), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: d.v / m * 100 + '%',
        background: d.hi ? 'var(--chart-2)' : 'var(--chart-1)',
        borderRadius: '3px 3px 0 0'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--text-muted)',
        marginTop: 10,
        textAlign: 'center',
        letterSpacing: '0.02em'
      }
    }, d.l))));
  }
  function Donut({
    pct,
    label,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 300,
        height: 300
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'conic-gradient(var(--chart-1) 0 ' + pct + '%, var(--chart-3) ' + pct + '% ' + (pct + 5.4) + '%, var(--n-200) ' + (pct + 5.4) + '% 100%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 56,
        borderRadius: '50%',
        background: 'var(--surface-page)',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 46,
        fontWeight: 600,
        letterSpacing: '-0.04em',
        color: 'var(--text-strong)'
      }
    }, pct, "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginTop: 4
      }
    }, label), sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 6,
        maxWidth: 150
      }
    }, sub))));
  }
  Object.assign(window, {
    Slide,
    SlideTitle,
    Bars,
    Donut,
    SlIcon,
    SLIDE_BASE: B
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/stationery/Stationery.jsx
try { (() => {
(function () {
  const {
    Logo,
    AccentRing,
    IconChip
  } = window.SADASAAcademyDesignSystem_4bbf87;
  const B = '../../';
  function StIcon({
    n,
    s = 13
  }) {
    const r = React.useRef(null);
    React.useEffect(() => {
      if (r.current && window.lucide) {
        r.current.innerHTML = '';
        const e = document.createElement('i');
        e.setAttribute('data-lucide', n);
        r.current.appendChild(e);
        window.lucide.createIcons({
          attrs: {
            width: s,
            height: s,
            'stroke-width': 2
          },
          nameAttr: 'data-lucide'
        });
      }
    }, [n, s]);
    return /*#__PURE__*/React.createElement("span", {
      ref: r,
      style: {
        display: 'inline-flex',
        width: s,
        height: s
      }
    });
  }
  function Sheet({
    w,
    h,
    scale,
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 'calc(' + w + ' * ' + scale + ')',
        height: 'calc(' + h + ' * ' + scale + ')',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: w,
        height: h,
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
        background: 'var(--n-0)',
        boxShadow: 'var(--shadow-2)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }
    }, children));
  }
  function Spec({
    title,
    items
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-body-lg)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--text-strong)'
      }
    }, title), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: '8px 0 0',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, items.map((t, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--text-muted)',
        letterSpacing: '0.02em'
      }
    }, t))));
  }
  function Letterhead() {
    return /*#__PURE__*/React.createElement(Sheet, {
      w: "210mm",
      h: "297mm",
      scale: 1.28
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: B,
      strength: "faint",
      position: "bottom-right",
      size: "150mm",
      style: {
        bottom: '-52mm',
        right: '-46mm'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '12mm',
        right: '20mm'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      assetBase: B,
      height: 54
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '37mm',
        right: 0,
        width: '58mm',
        background: 'var(--sadasa-red)',
        color: 'var(--n-0)',
        padding: '6mm 6mm 6mm 7mm',
        fontFamily: 'var(--font-print)',
        fontSize: '9.6pt',
        lineHeight: 1.35
      }
    }, /*#__PURE__*/React.createElement("div", null, "Sapen GK1 No.256, Caturtunggal", /*#__PURE__*/React.createElement("br", null), "Depok, Sleman, D.I.Yogyakarta,"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '4mm'
      }
    }, "Phone:+62 813 8834 4688", /*#__PURE__*/React.createElement("br", null), "Fax:+44 20 8859 6598")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '88mm',
        right: '6mm',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.4mm'
      }
    }, [['mail', 'info@sadasa.id'], ['globe', 'www.sadasa.id']].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '3mm'
      }
    }, /*#__PURE__*/React.createElement(IconChip, {
      size: 22
    }, /*#__PURE__*/React.createElement(StIcon, {
      n: i,
      s: 11
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-print)',
        fontSize: '10pt',
        color: 'var(--sadasa-red)'
      }
    }, t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '50mm',
        left: '20mm',
        right: '65mm',
        bottom: '20mm',
        fontFamily: 'var(--font-print)',
        fontSize: '10pt',
        lineHeight: '12pt',
        color: 'var(--n-800)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--fw-bold)'
      }
    }, "Lorem ipsum"), /*#__PURE__*/React.createElement("div", null, "dolor sit amet"), /*#__PURE__*/React.createElement("div", null, "consectetur adipiscing elit."), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'justify',
        margin: '10mm 0 0'
      }
    }, "Praesent luctus magna sit amet lorem accumsan tristique. Phasellus magna velit, vulputate ac nulla in, sagittis venenatis elit. Pellentesque gravida bibendum aliquet. Vivamus neque est, cursus nec felis sit amet, molestie hendrerit nulla. Vivamus vulputate dui tortor, ut pellentesque urna consequat vitae. Ut ut finibus metus. Fusce eget mattis sem, sed suscipit ex."), /*#__PURE__*/React.createElement("p", {
      style: {
        textAlign: 'justify',
        margin: '6mm 0 0'
      }
    }, "Curabitur auctor vitae nibh nec pharetra. Vestibulum dictum neque vel justo pharetra, eu tempus eros pellentesque. Praesent sit amet velit vitae diam luctus dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14mm'
      }
    }, "Curabitur vitae diam", /*#__PURE__*/React.createElement("br", null), "lacinia urna")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: '20mm',
        right: '65mm',
        top: '50mm',
        bottom: '20mm',
        outline: '0.3mm dashed var(--red-200)',
        pointerEvents: 'none'
      }
    }));
  }
  function BusinessCards() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Sheet, {
      w: "90mm",
      h: "55mm",
      scale: 2.1,
      style: {
        background: 'var(--sadasa-red)'
      }
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: B,
      strength: "strong",
      position: "bottom-left",
      size: "70mm",
      style: {
        opacity: 0.22,
        bottom: '-26mm',
        left: '-22mm'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '12mm',
        left: '10mm'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "white",
      orientation: "vertical",
      assetBase: B,
      height: 78
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '10mm',
        right: '10mm',
        width: '14mm',
        height: '14mm',
        borderRadius: '50%',
        background: 'var(--n-0)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '6mm',
        right: '10mm',
        fontFamily: 'var(--font-stationery)',
        fontSize: '6pt',
        letterSpacing: '0.22em',
        color: 'var(--n-0)'
      }
    }, "WWW.SADASA.ID")), /*#__PURE__*/React.createElement(Sheet, {
      w: "90mm",
      h: "55mm",
      scale: 2.1
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '10mm',
        right: '10mm',
        width: '14mm',
        height: '14mm',
        borderRadius: '50%',
        border: '0.3mm dashed var(--red-300)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '14mm',
        left: '10mm'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-stationery)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: '7.1pt',
        letterSpacing: '0.28em',
        color: 'var(--n-900)',
        lineHeight: 1.7
      }
    }, "A U L I A", /*#__PURE__*/React.createElement("br", null), "S U R Y A P R A Y O G A"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-stationery)',
        fontWeight: 'var(--fw-light)',
        fontSize: '3.2pt',
        letterSpacing: '0.3em',
        color: 'var(--sadasa-red)',
        marginTop: '2.4mm'
      }
    }, "C H I E F\xA0 M A N A G E M E N T\xA0 O F F I C E R")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '7mm',
        left: '10mm',
        fontFamily: 'var(--font-stationery)',
        fontWeight: 'var(--fw-light)',
        fontSize: '4pt',
        letterSpacing: '0.16em',
        color: 'var(--n-600)',
        lineHeight: 2
      }
    }, "Sapen GK1 No.256, Caturtunggal, Depok, Sleman, D.I. Yogyakarta", /*#__PURE__*/React.createElement("br", null), "+62 851-5983-3441 \xA0\xB7\xA0 info@sadasa.id \xA0\xB7\xA0 www.sadasa.id"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '7mm',
        right: '10mm'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      orientation: "mark",
      assetBase: B,
      height: 26
    }))));
  }
  function IdCard() {
    return /*#__PURE__*/React.createElement(Sheet, {
      w: "54mm",
      h: "86mm",
      scale: 2.1,
      style: {
        background: 'var(--n-0)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '34mm',
        background: 'var(--sadasa-red)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "white",
      orientation: "vertical",
      assetBase: B,
      height: 62
    })), /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: B,
      strength: "faint",
      position: "bottom-right",
      size: "60mm",
      style: {
        bottom: '-20mm',
        right: '-18mm'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '42mm',
        left: '6mm',
        right: '6mm',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-stationery)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: '8pt',
        letterSpacing: '0.26em',
        color: 'var(--n-900)',
        lineHeight: 1.8
      }
    }, "A U L I A", /*#__PURE__*/React.createElement("br", null), "S U R Y A P R A Y O G A"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-stationery)',
        fontWeight: 'var(--fw-light)',
        fontSize: '4pt',
        letterSpacing: '0.3em',
        color: 'var(--sadasa-red)',
        marginTop: '3mm'
      }
    }, "C H I E F\xA0 M A N A G E M E N T\xA0 O F F I C E R")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '6mm',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: 'var(--font-stationery)',
        fontSize: '5pt',
        letterSpacing: '0.22em',
        color: 'var(--n-500)'
      }
    }, "WWW.SADASA.ID"));
  }
  function Envelope() {
    return /*#__PURE__*/React.createElement(Sheet, {
      w: "230mm",
      h: "110mm",
      scale: 1.16
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: B,
      strength: "faint",
      position: "bottom-right",
      size: "120mm",
      style: {
        bottom: '-42mm',
        right: '-34mm'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '12mm',
        left: '14mm'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      assetBase: B,
      height: 44
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '12mm',
        left: '14mm',
        fontFamily: 'var(--font-print)',
        fontSize: '8.5pt',
        lineHeight: 1.4,
        color: 'var(--n-600)'
      }
    }, "Sapen GK1 No.256, Caturtunggal", /*#__PURE__*/React.createElement("br", null), "Depok, Sleman, D.I. Yogyakarta", /*#__PURE__*/React.createElement("br", null), "+62 813 8834 4688 \xB7 www.sadasa.id"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '44mm',
        right: '20mm',
        width: '86mm',
        borderTop: '0.3mm solid var(--border-hairline)',
        paddingTop: '4mm',
        fontFamily: 'var(--font-print)',
        fontSize: '9pt',
        color: 'var(--n-800)',
        lineHeight: 1.5
      }
    }, "Kepada,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--fw-bold)'
      }
    }, "Nama Penerima"), /*#__PURE__*/React.createElement("br", null), "Jabatan \xB7 Institusi", /*#__PURE__*/React.createElement("br", null), "Alamat lengkap penerima"));
  }
  function Stamps() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 24,
        alignItems: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 'calc(60mm * 1.7)',
        height: 'calc(32mm * 1.7)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '60mm',
        height: '32mm',
        transform: 'scale(1.7)',
        transformOrigin: 'top left',
        position: 'relative',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '32mm',
        height: '32mm',
        borderRadius: '50%',
        border: '0.6mm solid var(--sadasa-red)',
        display: 'grid',
        placeItems: 'center',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      orientation: "mark",
      assetBase: B,
      height: 40
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        outline: '0.25mm dashed var(--red-200)',
        pointerEvents: 'none'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--text-muted)',
        marginTop: 8
      }
    }, "ROUND \xB7 32 \xD7 60 mm \xB7 logo 20 mm")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 'calc(35mm * 1.7)',
        height: 'calc(35mm * 1.7)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '35mm',
        height: '35mm',
        transform: 'scale(1.7)',
        transformOrigin: 'top left',
        border: '0.6mm solid var(--sadasa-red)',
        display: 'grid',
        placeItems: 'center',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      assetBase: B,
      height: 26
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--text-muted)',
        marginTop: 8
      }
    }, "SQUARE \xB7 35 \xD7 35 mm \xB7 logo 15 mm")));
  }
  function StationeryKit() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '28px 32px 48px',
        maxWidth: 1360,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-brand)'
      }
    }, "Stationery"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-display-3)',
        letterSpacing: 'var(--tracking-display)',
        margin: '8px 0 6px'
      }
    }, "Print & identity collateral"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        margin: 0,
        maxWidth: '70ch'
      }
    }, "Recreated at true millimetre size from SADASA Identity Guideline v2, pp. 07\u201311. Dashed rules mark type areas and stamp guides; they do not print.")), /*#__PURE__*/React.createElement(Logo, {
      assetBase: B,
      height: 34
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '32px 36px',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Letterhead, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spec, {
      title: "Letterhead",
      items: ['A4 · 210 × 297 mm', 'margin atas 5 cm · bawah 2 cm', 'margin kiri 2 cm · kanan 6,5 cm', 'Gotham Narrow Book 10 pt / 12 pt · spacing 125%', 'address panel: SADASA Red, flush to the right edge', '¾ ring: faint tint, bleeding off the bottom-right']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '18px 0 0'
      }
    }, /*#__PURE__*/React.createElement(Spec, {
      title: "Business card",
      items: ['90 × 55 mm · die-cut accent hole', 'nama GalanoGrotesque-SemiBold 7,1 pt', 'jabatan Light 3,2 pt · keterangan Light 4 pt', 'front: solid red with the vertical lockup']
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(BusinessCards, null))), /*#__PURE__*/React.createElement(IdCard, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spec, {
      title: "ID card",
      items: ['54 × 86 mm · bahan PVC', 'cetak 1 muka (2 muka apabila diperlukan)', 'red header band with the vertical lockup', 'name letter-spaced 0.26em, role in red']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Spec, {
      title: "Stamps",
      items: ['round: 32 × 60 mm bounding · logo height 20 mm', 'square: 35 × 35 mm · logo height 15 mm', 'satu warna: SADASA Red', 'guides are not printed']
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Stamps, null))), /*#__PURE__*/React.createElement(Envelope, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spec, {
      title: "Envelope",
      items: ['230 × 110 mm', 'logo top-left at 44 px equivalent', 'sender block bottom-left, Gotham Narrow 8,5 pt', 'recipient block right, hairline rule above']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        padding: 16,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10
      }
    }, "Supplied artwork, for comparison"), /*#__PURE__*/React.createElement("img", {
      src: B + 'assets/stationery/letterhead-front.png',
      alt: "Supplied letterhead artwork",
      style: {
        width: '100%',
        maxWidth: 300,
        border: '1px solid var(--border-hairline)'
      }
    })))));
  }
  Object.assign(window, {
    StationeryKit
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/stationery/Stationery.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/App.jsx
try { (() => {
(function () {
  const {
    Logo,
    IconChip,
    Button,
    IconButton,
    Badge
  } = window.SADASAAcademyDesignSystem_4bbf87;
  const KIT_BASE = '../../';
  const vlNav = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard'
  }, {
    id: 'catalog',
    label: 'Katalog Kelas',
    icon: 'library'
  }, {
    id: 'player',
    label: 'Kelas Saya',
    icon: 'circle-play'
  }, {
    id: 'consulting',
    label: 'Consulting',
    icon: 'briefcase'
  }, {
    id: 'talent',
    label: 'DigiTalent Bridge',
    icon: 'users'
  }];
  function VLIcon({
    n,
    s = 18,
    color
  }) {
    const r = React.useRef(null);
    React.useEffect(() => {
      if (r.current && window.lucide) {
        r.current.innerHTML = '';
        const e = document.createElement('i');
        e.setAttribute('data-lucide', n);
        r.current.appendChild(e);
        window.lucide.createIcons({
          attrs: {
            width: s,
            height: s,
            'stroke-width': 2
          },
          nameAttr: 'data-lucide'
        });
      }
    }, [n, s]);
    return /*#__PURE__*/React.createElement("span", {
      ref: r,
      style: {
        display: 'inline-flex',
        width: s,
        height: s,
        color: color || 'currentColor'
      }
    });
  }
  function VLSidebar({
    screen,
    go
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 236,
        flex: 'none',
        background: 'var(--surface-card)',
        borderRight: '1px solid var(--border-hairline)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 8px 20px'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      assetBase: KIT_BASE,
      height: 30
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, vlNav.map(n => {
      const on = n.id === screen;
      return /*#__PURE__*/React.createElement("button", {
        key: n.id,
        type: "button",
        onClick: () => go(n.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 10px',
          border: 0,
          borderRadius: 'var(--radius-sm)',
          background: on ? 'var(--surface-accent-soft)' : 'transparent',
          color: on ? 'var(--text-brand)' : 'var(--text-body)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'var(--transition-control)',
          position: 'relative'
        }
      }, on && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: -14,
          top: 6,
          bottom: 6,
          width: 3,
          background: 'var(--sadasa-red)',
          borderRadius: '0 2px 2px 0'
        }
      }), /*#__PURE__*/React.createElement(VLIcon, {
        n: n.icon,
        s: 17
      }), n.label);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        background: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-md)',
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, "Butuh bantuan?"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-body-sm)',
        color: 'var(--text-body)',
        margin: '8px 0 12px'
      }
    }, "Tim kami membalas dalam satu hari kerja."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(IconChip, {
      size: 24
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "mail",
      s: 12
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-body-sm)'
      }
    }, "info@sadasa.id"))));
  }
  function VLTopBar({
    title,
    crumb,
    children
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 28px',
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-hairline)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, crumb && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-brand)'
      }
    }, crumb), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-h2)',
        margin: crumb ? '4px 0 0' : 0,
        letterSpacing: 'var(--tracking-display)'
      }
    }, title)), children, /*#__PURE__*/React.createElement(IconButton, {
      label: "Notifikasi",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "bell"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 14,
        borderLeft: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 'var(--radius-circle)',
        background: 'var(--n-800)',
        color: 'var(--n-0)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 'var(--text-body-sm)',
        fontWeight: 'var(--fw-bold)'
      }
    }, "RH"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-body-sm)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-strong)'
      }
    }, "Ridho Haga P."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-micro)',
        color: 'var(--text-muted)'
      }
    }, "Corporate \xB7 Biofarma"))));
  }
  function VLApp() {
    const [signedIn, setSignedIn] = React.useState(false);
    const [screen, setScreen] = React.useState('dashboard');
    const [course, setCourse] = React.useState(null);
    if (!signedIn) return /*#__PURE__*/React.createElement(VLLogin, {
      onSignIn: () => setSignedIn(true)
    });
    const open = c => {
      setCourse(c);
      setScreen('player');
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: '100%',
        minHeight: 0,
        background: 'var(--surface-page)'
      }
    }, /*#__PURE__*/React.createElement(VLSidebar, {
      screen: screen,
      go: setScreen
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    }, screen === 'dashboard' && /*#__PURE__*/React.createElement(VLDashboard, {
      open: open,
      go: setScreen
    }), screen === 'catalog' && /*#__PURE__*/React.createElement(VLCatalog, {
      open: open
    }), screen === 'player' && /*#__PURE__*/React.createElement(VLPlayer, {
      course: course,
      back: () => setScreen('catalog')
    }), (screen === 'consulting' || screen === 'talent') && /*#__PURE__*/React.createElement(VLServices, {
      screen: screen
    })));
  }
  Object.assign(window, {
    VLApp,
    VLIcon,
    VLTopBar,
    VLSidebar,
    KIT_BASE
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/Catalog.jsx
try { (() => {
(function () {
  const {
    Button,
    Input,
    Select,
    Tabs,
    Tag,
    CourseCard,
    Card,
    Switch
  } = window.SADASAAcademyDesignSystem_4bbf87;
  function VLCatalog({
    open
  }) {
    const [track, setTrack] = React.useState('all');
    const [level, setLevel] = React.useState(null);
    const [q, setQ] = React.useState('');
    const all = window.VL_COURSES;
    const counts = {
      all: all.length,
      R: all.filter(c => c.track === 'R').length,
      Python: all.filter(c => c.track === 'Python').length,
      SQL: all.filter(c => c.track === 'SQL').length,
      BI: all.filter(c => c.track === 'BI').length
    };
    const rows = all.filter(c => (track === 'all' || c.track === track) && (!level || c.level === level) && (!q || c.title.toLowerCase().includes(q.toLowerCase())));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VLTopBar, {
      crumb: "Video Learning on Demand",
      title: "Katalog Kelas"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 250
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Cari kelas\u2026",
      value: q,
      onChange: e => setQ(e.target.value),
      prefix: /*#__PURE__*/React.createElement(VLIcon, {
        n: "search",
        s: 16
      }),
      size: "sm"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: '22px 28px 40px'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      items: [{
        value: 'all',
        label: 'Semua Kelas',
        count: counts.all
      }, {
        value: 'R',
        label: 'R',
        count: counts.R
      }, {
        value: 'Python',
        label: 'Python',
        count: counts.Python
      }, {
        value: 'SQL',
        label: 'SQL',
        count: counts.SQL
      }, {
        value: 'BI',
        label: 'Business Intelligence',
        count: counts.BI
      }],
      value: track,
      onChange: setTrack,
      style: {
        marginBottom: 18
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginRight: 4
      }
    }, "Level"), ['Basic Course', 'Intermediate Course', 'Advance Course'].map(l => /*#__PURE__*/React.createElement(Tag, {
      key: l,
      tone: "neutral",
      size: "sm",
      selected: level === l,
      onClick: () => setLevel(level === l ? null : l)
    }, l)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      label: "Hanya yang belum diambil",
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 180
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ['Terbaru', 'Paling banyak video', 'Durasi terpendek'],
      defaultValue: "Terbaru"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-caption)',
        color: 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wide)'
      }
    }, rows.length, " KELAS \xB7 ", rows.reduce((a, c) => a + c.videos, 0), " VIDEOS"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconStart: /*#__PURE__*/React.createElement(VLIcon, {
        n: "sliders-horizontal",
        s: 15
      })
    }, "Filter lanjutan")), rows.length === 0 ? /*#__PURE__*/React.createElement(Card, {
      variant: "outline",
      padding: "default",
      style: {
        textAlign: 'center',
        padding: '48px 24px'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + 'assets/illustrations/mascot-pair-thumbs.png',
      alt: "",
      style: {
        height: 120,
        margin: '0 auto 16px'
      }
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '0 0 6px'
      }
    }, "Belum ada kelas yang cocok"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'var(--text-muted)',
        fontSize: 'var(--text-body-sm)'
      }
    }, "Coba hapus filter level atau ubah kata kunci.")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 16
      }
    }, rows.map(c => /*#__PURE__*/React.createElement(CourseCard, {
      key: c.title,
      title: c.title,
      level: c.level,
      videos: c.videos,
      duration: c.duration,
      thumbnail: KIT_BASE + c.thumb,
      topics: c.topics.slice(0, 2),
      onClick: () => open(c)
    })))));
  }
  Object.assign(window, {
    VLCatalog
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/Dashboard.jsx
try { (() => {
(function () {
  const {
    Button,
    Card,
    StatCard,
    ProgressBar,
    Alert,
    SectionTitle,
    ServiceIcon,
    Badge,
    Tag,
    AccentRing
  } = window.SADASAAcademyDesignSystem_4bbf87;
  function VLDashboard({
    open,
    go
  }) {
    const inProgress = [{
      c: window.VL_COURSES[0],
      p: 35,
      done: 17
    }, {
      c: window.VL_COURSES[3],
      p: 72,
      done: 40
    }, {
      c: window.VL_COURSES[6],
      p: 12,
      done: 6
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VLTopBar, {
      crumb: "Video Learning",
      title: "Dashboard"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconStart: /*#__PURE__*/React.createElement(VLIcon, {
        n: "download",
        s: 15
      })
    }, "Unduh sertifikat")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: '26px 28px 40px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface-brand-deep)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        marginBottom: 22,
        display: 'flex',
        alignItems: 'center',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: KIT_BASE,
      strength: "strong",
      position: "bottom-right",
      size: "88%",
      style: {
        opacity: 0.16
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--gold-400)'
      }
    }, "Learning path"), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: 'var(--n-0)',
        fontSize: 'var(--text-h1)',
        letterSpacing: 'var(--tracking-display)',
        margin: '8px 0 6px'
      }
    }, "Associate Data Scientist"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'oklch(1 0 0 / 0.74)',
        margin: '0 0 18px',
        maxWidth: '54ch'
      }
    }, "Tiga kelas lagi menuju sertifikasi SKKNI. Jalur ini menggabungkan Video Learning dan Training terjadwal."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        maxWidth: 320
      }
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      value: 62,
      tone: "gold",
      valueLabel: "62%"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "inverse",
      size: "sm",
      onClick: () => open(window.VL_COURSES[0])
    }, "Lanjutkan"))), /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + 'assets/illustrations/mascot-graduates.png',
      alt: "",
      style: {
        position: 'relative',
        height: 150,
        width: 'auto',
        flex: 'none'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      value: "6",
      label: "Kelas aktif"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "152",
      label: "Video ditonton"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "48",
      unit: "h",
      label: "Jam belajar",
      tone: "gold"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "91.8",
      unit: "%",
      label: "Rata-rata nilai"
    })), /*#__PURE__*/React.createElement(Alert, {
      tone: "brand",
      title: "Batch baru dibuka",
      icon: /*#__PURE__*/React.createElement(VLIcon, {
        n: "calendar",
        s: 16
      }),
      style: {
        marginBottom: 24
      }
    }, "Statistics Inference with R mulai 01 September 2022, kuota 20 peserta."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Kelas saya",
      title: "Sedang berjalan",
      size: "sm"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('catalog'),
      iconEnd: /*#__PURE__*/React.createElement(VLIcon, {
        n: "arrow-right",
        s: 15
      })
    }, "Semua kelas")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 14,
        marginBottom: 28
      }
    }, inProgress.map(({
      c,
      p,
      done
    }) => /*#__PURE__*/React.createElement(Card, {
      key: c.title,
      padding: "none",
      interactive: true,
      onClick: () => open(c)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderRadius: '8px 8px 0 0'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + c.thumb,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--scrim-bottom)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 12,
        bottom: 10,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        letterSpacing: 'var(--tracking-wide)',
        color: 'var(--n-0)'
      }
    }, done, " / ", c.videos, " VIDEOS"), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: 10,
        top: 10
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "ink",
      variant: "solid",
      size: "sm"
    }, c.track))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 16px 16px'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: /Advance/.test(c.level) ? 'advance' : /Intermediate/.test(c.level) ? 'intermediate' : 'basic',
      size: "sm"
    }, c.level), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--text-h4)',
        margin: '10px 0 12px',
        letterSpacing: 'var(--tracking-tight)'
      }
    }, c.title), /*#__PURE__*/React.createElement(ProgressBar, {
      value: p,
      size: "sm",
      valueLabel: p + '%',
      tone: p > 65 ? 'gold' : 'red'
    }))))), /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Sadasa Academy",
      title: "Empat layanan, semua tentang data",
      size: "sm",
      style: {
        marginBottom: 16
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14
      }
    }, [['training', 'Training', 'On-scheduled, interaktif, kelas korporat dan publik.'], ['video-learning', 'Video Learning', 'Kelas on-demand yang diproduksi di Studio Sadasa.'], ['consulting', 'Consulting', 'Data architecture, dashboard, dan pemodelan data.'], ['digitalent-bridge', 'DigiTalent Bridge', 'Menghubungkan talenta terlatih dengan organisasi.']].map(([n, t, d]) => /*#__PURE__*/React.createElement(Card, {
      key: n,
      padding: "default",
      variant: "outline"
    }, /*#__PURE__*/React.createElement(ServiceIcon, {
      name: n,
      size: 40,
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: '14px 0 6px',
        fontSize: 'var(--text-body-lg)'
      }
    }, t), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-body-sm)',
        color: 'var(--text-muted)'
      }
    }, d))))));
  }
  Object.assign(window, {
    VLDashboard
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/Login.jsx
try { (() => {
(function () {
  const {
    Logo,
    AccentRing,
    Button,
    Input,
    Checkbox
  } = window.SADASAAcademyDesignSystem_4bbf87;
  function VLLogin({
    onSignIn
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100%',
        background: 'var(--surface-page)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 72px',
        maxWidth: 560
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      assetBase: KIT_BASE,
      height: 34,
      style: {
        marginBottom: 44
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-brand)'
      }
    }, "Video Learning"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-display-3)',
        letterSpacing: 'var(--tracking-display)',
        margin: '10px 0 6px',
        lineHeight: 1.06
      }
    }, "Sugeng Rawuh!"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--text-body-lg)',
        fontWeight: 'var(--fw-light)',
        margin: '0 0 32px'
      }
    }, "Masuk untuk melanjutkan kelas Anda."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      defaultValue: "ridho@sadasa.id",
      prefix: /*#__PURE__*/React.createElement(VLIcon, {
        n: "mail",
        s: 16
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Password",
      type: "password",
      defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      prefix: /*#__PURE__*/React.createElement(VLIcon, {
        n: "lock",
        s: 16
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      label: "Ingat saya",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 'var(--text-body-sm)'
      }
    }, "Lupa password?")), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: onSignIn,
      iconEnd: /*#__PURE__*/React.createElement(VLIcon, {
        n: "arrow-right",
        s: 18
      })
    }, "Masuk"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-body-sm)',
        color: 'var(--text-muted)',
        textAlign: 'center',
        margin: 0
      }
    }, "Belum punya akun? ", /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Hubungi tim kami")))), /*#__PURE__*/React.createElement("div", {
      "data-theme": "ink",
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--red-950)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 48
      }
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: KIT_BASE,
      strength: "strong",
      position: "top-right",
      size: "120%",
      style: {
        opacity: 0.2
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + 'assets/photos/camera-shoot.png',
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.42
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--scrim-bottom)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        borderTop: 'var(--rule-accent) solid var(--gold-500)',
        marginBottom: 18
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--n-0)',
        fontSize: 'var(--text-h2)',
        fontWeight: 'var(--fw-light)',
        lineHeight: 1.32,
        margin: '0 0 20px',
        maxWidth: '22ch'
      }
    }, "Data analytics is an evidence-based policymaking tool."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 36
      }
    }, [['18', 'Courses'], ['152', 'Videos'], ['2019', 'Sejak']].map(([v, l]) => /*#__PURE__*/React.createElement("span", {
      key: l,
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-h2)',
        fontWeight: 600,
        color: 'var(--gold-500)'
      }
    }, v), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-micro)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'oklch(1 0 0 / 0.62)'
      }
    }, l)))))));
  }
  Object.assign(window, {
    VLLogin
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/Player.jsx
try { (() => {
(function () {
  const {
    Button,
    IconButton,
    Badge,
    Tag,
    Tabs,
    Card,
    ProgressBar,
    Breadcrumb,
    Checkbox,
    DataTable,
    Alert
  } = window.SADASAAcademyDesignSystem_4bbf87;
  function VLPlayer({
    course,
    back
  }) {
    const c = course || window.VL_COURSES[0];
    const [tab, setTab] = React.useState('silabus');
    const [active, setActive] = React.useState(2);
    const lessons = [{
      t: 'Apa itu R dan RStudio',
      d: '6:12'
    }, {
      t: 'Instalasi dan environment',
      d: '8:40'
    }, {
      t: 'Vector, list, dan data frame',
      d: '12:05'
    }, {
      t: 'Membaca data dari CSV',
      d: '9:28'
    }, {
      t: 'dplyr: filter, select, mutate',
      d: '14:52'
    }, {
      t: 'Latihan: eksplorasi data BMKG',
      d: '18:03'
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VLTopBar, {
      crumb: "Kelas saya",
      title: c.title
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: back,
      iconStart: /*#__PURE__*/React.createElement(VLIcon, {
        n: "arrow-left",
        s: 15
      })
    }, "Katalog"), /*#__PURE__*/React.createElement(Button, {
      variant: "gold",
      size: "sm",
      iconStart: /*#__PURE__*/React.createElement(VLIcon, {
        n: "graduation-cap",
        s: 15
      })
    }, "Ambil ujian")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: '20px 28px 40px'
      }
    }, /*#__PURE__*/React.createElement(Breadcrumb, {
      items: [{
        label: 'Video Learning',
        href: '#'
      }, {
        label: c.track,
        href: '#'
      }, {
        label: c.title
      }],
      style: {
        marginBottom: 14
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.65fr 1fr',
        gap: 20,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '16 / 9',
        background: 'var(--red-950)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + c.thumb,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.55
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--scrim-bottom)'
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Putar video",
      style: {
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        width: 66,
        height: 66,
        borderRadius: 'var(--radius-circle)',
        border: 0,
        background: 'var(--sadasa-red)',
        color: 'var(--n-0)',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-3)'
      }
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "play",
      s: 26
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'oklch(0.176 0.03 28 / 0.55)',
        backdropFilter: 'var(--glass-blur)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--n-0)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "pause",
      s: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 4,
        background: 'oklch(1 0 0 / 0.28)',
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '38%',
        height: '100%',
        background: 'var(--sadasa-red)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--n-0)'
      }
    }, "04:38 / 12:05"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--n-0)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "volume-2",
      s: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--n-0)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "maximize",
      s: 16
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        margin: '16px 0 14px',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      tone: /Advance/.test(c.level) ? 'advance' : /Intermediate/.test(c.level) ? 'intermediate' : 'basic'
    }, c.level), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      variant: "outline"
    }, c.videos, " videos"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      variant: "outline"
    }, c.duration, " duration"), /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      dot: true
    }, "Sertifikat tersedia")), /*#__PURE__*/React.createElement(Tabs, {
      items: [{
        value: 'silabus',
        label: 'Silabus'
      }, {
        value: 'tentang',
        label: 'Tentang kelas'
      }, {
        value: 'portofolio',
        label: 'Portofolio klien'
      }],
      value: tab,
      onChange: setTab,
      style: {
        marginBottom: 16
      }
    }), tab === 'silabus' && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, c.topics.map((t, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: "tight",
      variant: "outline"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-caption)',
        color: 'var(--text-subtle)'
      }
    }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 'var(--text-body)',
        color: 'var(--text-strong)',
        fontWeight: 'var(--fw-medium)'
      }
    }, t), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "circle-play",
      s: 18
    })))))), tab === 'tentang' && /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--measure-prose)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-body)'
      }
    }, "Our company believes that knowledge management, data management, and data analytics are an integral part of planning and decision-making, especially in the public sector, where public goodwill is the primary goal."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-body)',
        margin: 0
      }
    }, "Kelas ini diproduksi di Studio Sadasa, Yogyakarta, dengan alur produksi lima tahap: architecting curriculum, pre-production, production, post-production, distribution.")), tab === 'portofolio' && /*#__PURE__*/React.createElement(DataTable, {
      dense: true,
      columns: [{
        key: 'n',
        header: 'Nama Consulting'
      }, {
        key: 'k',
        header: 'Klien'
      }, {
        key: 'r',
        header: 'Revenue',
        numeric: true
      }, {
        key: 'g',
        header: 'Gross Profit',
        numeric: true
      }],
      rows: window.VL_CONSULTING
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "default",
      variant: "raised"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-brand)'
      }
    }, "Progres kelas"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        margin: '10px 0 12px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-h1)',
        fontWeight: 600,
        letterSpacing: '-0.03em',
        color: 'var(--text-strong)'
      }
    }, "35"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-body)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-muted)'
      }
    }, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
      value: 35,
      valueLabel: "17 / 48 videos"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      style: {
        marginTop: 16
      },
      iconEnd: /*#__PURE__*/React.createElement(VLIcon, {
        n: "arrow-right",
        s: 16
      })
    }, "Lanjutkan menonton")), /*#__PURE__*/React.createElement(Card, {
      padding: "tight",
      variant: "outline"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10
      }
    }, "Daftar video"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxHeight: 236,
        overflow: 'auto'
      }
    }, lessons.map((l, i) => {
      const on = i === active;
      return /*#__PURE__*/React.createElement("button", {
        key: l.t,
        type: "button",
        onClick: () => setActive(i),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 10px',
          border: 0,
          borderRadius: 'var(--radius-sm)',
          background: on ? 'var(--surface-accent-soft)' : 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'var(--transition-control)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: on ? 'var(--accent)' : 'var(--text-subtle)',
          display: 'inline-flex'
        }
      }, /*#__PURE__*/React.createElement(VLIcon, {
        n: i < active ? 'circle-check' : 'circle-play',
        s: 16
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 'var(--text-body-sm)',
          color: on ? 'var(--text-brand)' : 'var(--text-body)',
          fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-regular)'
        }
      }, l.t), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--text-subtle)'
        }
      }, l.d));
    }))), /*#__PURE__*/React.createElement(Card, {
      padding: "tight",
      variant: "outline"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-micro)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10
      }
    }, "Preferensi"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      label: "Subtitle Bahasa Indonesia",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Autoplay video berikutnya"
    })))))));
  }
  Object.assign(window, {
    VLPlayer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/Player.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/Services.jsx
try { (() => {
(function () {
  const {
    SectionTitle,
    Card,
    Button,
    DataTable,
    StatCard,
    ServiceIcon,
    Badge,
    Alert,
    AccentRing,
    IconChip
  } = window.SADASAAcademyDesignSystem_4bbf87;
  function VLServices({
    screen
  }) {
    const consulting = screen === 'consulting';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VLTopBar, {
      crumb: consulting ? 'Consulting' : 'DigiTalent Bridge',
      title: consulting ? 'Portofolio Consulting' : 'Talent & Partner'
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconStart: /*#__PURE__*/React.createElement(VLIcon, {
        n: "plus",
        s: 15
      })
    }, "Ajukan proyek")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: '26px 28px 40px'
      }
    }, consulting ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      value: "7",
      label: "Proyek berjalan"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "4",
      label: "Sektor klien",
      tone: "gold"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "2019",
      label: "Sejak"
    }), /*#__PURE__*/React.createElement(StatCard, {
      value: "5",
      label: "Tahap produksi",
      tone: "ink"
    })), /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Data",
      title: "Consulting & Corporate",
      size: "sm",
      style: {
        marginBottom: 14
      }
    }), /*#__PURE__*/React.createElement(DataTable, {
      zebra: true,
      columns: [{
        key: 'n',
        header: 'Nama Consulting'
      }, {
        key: 'k',
        header: 'Klien'
      }, {
        key: 'r',
        header: 'Revenue',
        numeric: true
      }, {
        key: 'g',
        header: 'Gross Profit',
        numeric: true
      }],
      rows: window.VL_CONSULTING,
      caption: "Angka dalam Rupiah, mengikuti format ribuan Indonesia."
    }), /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Flow",
      title: "Lima tahap produksi",
      size: "sm",
      style: {
        margin: '28px 0 14px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gap: 12
      }
    }, [['01', 'Architecting Curriculum', 'Menerjemahkan praktik industri menjadi silabus.'], ['02', 'Pre-production', 'Script, bank soal, penjadwalan talent.'], ['03', 'Production', 'Pengambilan video dan penyiapan bahan editing.'], ['04', 'Post-production', 'Quality control dan pengelolaan video final.'], ['05', 'Distribution', 'Pengalaman belajar sinkron dan asinkron di LMS.']].map(([n, t, d]) => /*#__PURE__*/React.createElement(Card, {
      key: n,
      padding: "tight",
      variant: "outline"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-h3)',
        fontWeight: 600,
        color: 'var(--accent)'
      }
    }, n), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: '8px 0 6px',
        fontSize: 'var(--text-body)'
      }
    }, t), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-body-sm)',
        color: 'var(--text-muted)'
      }
    }, d))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--red-950)',
        borderRadius: 'var(--radius-lg)',
        padding: '30px 32px',
        marginBottom: 24,
        display: 'flex',
        gap: 26,
        alignItems: 'center'
      },
      "data-theme": "ink"
    }, /*#__PURE__*/React.createElement(AccentRing, {
      assetBase: KIT_BASE,
      strength: "strong",
      position: "right",
      size: "70%",
      style: {
        opacity: 0.18
      }
    }), /*#__PURE__*/React.createElement("img", {
      src: KIT_BASE + 'assets/icons/digitalent-bridge.png',
      alt: "",
      style: {
        height: 100,
        width: 'auto',
        flex: 'none',
        position: 'relative'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        color: 'var(--n-0)',
        fontSize: 'var(--text-h1)',
        letterSpacing: 'var(--tracking-display)',
        margin: '0 0 8px'
      }
    }, "DigiTalent Bridge"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'oklch(1 0 0 / 0.74)',
        margin: 0,
        maxWidth: '58ch'
      }
    }, "Menghubungkan lulusan Video Learning dan Training dengan organisasi yang sedang membangun kapasitas data."))), /*#__PURE__*/React.createElement(Alert, {
      tone: "info",
      title: "12 talenta siap disalurkan",
      icon: /*#__PURE__*/React.createElement(VLIcon, {
        n: "users",
        s: 16
      }),
      style: {
        marginBottom: 24
      }
    }, "Semua telah menyelesaikan learning path Associate Data Scientist."), /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "People",
      title: "Sadasa Team",
      size: "sm",
      style: {
        marginBottom: 14
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14
      }
    }, [['KRISOSTOMUS NOVA R.', 'Director'], ['RIDHO HAGA PRATAMA', 'Product Development Manager'], ['CLAUDIUS ANDIKA D.', 'Marketing & Partnership Manager'], ['ELISABETH CESARIA D. N.', 'Business Administrator & General Affair']].map(([n, r]) => /*#__PURE__*/React.createElement(Card, {
      key: n,
      padding: "tight",
      variant: "outline"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(IconChip, {
      size: 40,
      tone: "soft"
    }, /*#__PURE__*/React.createElement(VLIcon, {
      n: "user",
      s: 18
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-body-sm)',
        fontWeight: 'var(--fw-bold)',
        letterSpacing: '0.04em',
        color: 'var(--text-strong)'
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-caption)',
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, r)))))), /*#__PURE__*/React.createElement(SectionTitle, {
      eyebrow: "Partners",
      title: "Empat layanan",
      size: "sm",
      style: {
        margin: '28px 0 14px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 26,
        alignItems: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "training",
      size: 46,
      label: "Training",
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "video-learning",
      size: 46,
      label: "Video Learning",
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "consulting",
      size: 46,
      label: "Consulting",
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "analytics",
      size: 46,
      label: "Analytics",
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "research",
      size: 46,
      label: "Research",
      assetBase: KIT_BASE
    }), /*#__PURE__*/React.createElement(ServiceIcon, {
      name: "engineering",
      size: 46,
      label: "Engineering",
      assetBase: KIT_BASE
    })))));
  }
  Object.assign(window, {
    VLServices
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/video_learning/data.js
try { (() => {
window.VL_COURSES = [{
  title: 'Introduction to R (Part I)',
  level: 'Basic Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/studio-edit.png',
  track: 'R',
  topics: ['Introduction to R', 'Intermediate R', 'Manipulation Data with dplyr']
}, {
  title: 'Advanced R for Data Analytics',
  level: 'Intermediate Course',
  videos: 52,
  duration: '8h',
  thumb: 'assets/photos/learners-laptop.png',
  track: 'R',
  topics: ['Introduction to statistics', 'Introduction to statistics in R']
}, {
  title: 'Text Mining with R',
  level: 'Advance Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/camera-shoot.png',
  track: 'R',
  topics: ['Exploratory Data Analysis', 'Text Mining']
}, {
  title: 'Pengantar Python',
  level: 'Basic Course',
  videos: 55,
  duration: '8h',
  thumb: 'assets/photos/hands-keyboard.png',
  track: 'Python',
  topics: ['Introduction to Python', 'Intermediate Python']
}, {
  title: 'Manipulation Data with pandas',
  level: 'Basic Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/team-group.png',
  track: 'Python',
  topics: ['Manipulation Data with pandas', 'Introduction to statistics in Python']
}, {
  title: 'Time Series & Forecasting',
  level: 'Intermediate Course',
  videos: 52,
  duration: '8h',
  thumb: 'assets/photos/office-exterior.png',
  track: 'Python',
  topics: ['Introduction to statistics', 'Forecasting']
}, {
  title: 'Introduction to SQL',
  level: 'Basic Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/portrait-red.png',
  track: 'SQL',
  topics: ['Introduction to SQL', 'Joining Data in SQL', 'Intermediate SQL']
}, {
  title: 'Data Visualization with Tableau',
  level: 'Intermediate Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/studio-edit.png',
  track: 'BI',
  topics: ['Introduction to Data Visualization', 'Data Visualization with Tableau']
}, {
  title: 'Data Visualization with Power BI',
  level: 'Intermediate Course',
  videos: 48,
  duration: '8h',
  thumb: 'assets/photos/learners-laptop.png',
  track: 'BI',
  topics: ['Introduction to Data Visualization', 'Data Visualization with Power BI']
}];
window.VL_CONSULTING = [{
  n: 'Enterprise Architecture',
  k: 'Kementerian Kesehatan RI',
  r: '193.864.728',
  g: '110.852.076'
}, {
  n: 'Data Architecture',
  k: 'Biofarma',
  r: '299.878.200',
  g: '99.511.369'
}, {
  n: 'Data Analitika Marketing Insight',
  k: 'PANDI',
  r: '49.401.000',
  g: '41.950.000'
}, {
  n: 'SINAR',
  k: 'PT Wesolve Solusi Indonesia',
  r: '44.200.000',
  g: '37.500.000'
}, {
  n: 'Layout design & visualization book',
  k: 'UNDP Indonesia',
  r: '45.000.000',
  g: '25.365.091'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/video_learning/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AccentRing = __ds_scope.AccentRing;

__ds_ns.IconChip = __ds_scope.IconChip;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.ServiceIcon = __ds_scope.ServiceIcon;

__ds_ns.AccentRule = __ds_scope.AccentRule;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.CourseCard = __ds_scope.CourseCard;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
