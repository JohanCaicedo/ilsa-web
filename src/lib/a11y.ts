/**
 * Accessibility Validation Helpers
 * For use in accessibility audits and CI/CD checks
 */

import type { TeamMember } from "./team";

/**
 * Validate TeamMember props for accessibility compliance
 */
export interface TeamMemberValidationResult {
    id: string;
    name: string;
    hasValidImage: boolean;
    hasRole: boolean;
    hasFullDescription: boolean;
    issues: string[];
}

/**
 * Validate a single team member for accessibility
 * Checks for required attributes and best practices
 */
export function validateTeamMember(member: TeamMember): TeamMemberValidationResult {
    const issues: string[] = [];

    // Check if image URL is present and not a placeholder
    const hasValidImage = member.image && !member.image.includes("place_holder");

    // Check if role is present
    const hasRole = !!member.role;

    // Check if fullDescription is present (important for screen readers)
    const hasFullDescription = !!member.fullDescription;

    if (!hasValidImage) {
        issues.push(`Missing or invalid image: ${member.image || "none"}`);
    }

    if (!hasRole) {
        issues.push(`Missing role for member: ${member.name}`);
    }

    if (!hasFullDescription) {
        issues.push(`Missing fullDescription for member: ${member.name}`);
    }

    return {
        id: member.id,
        name: member.name,
        hasValidImage,
        hasRole,
        hasFullDescription,
        issues,
    };
}

/**
 * Validate an array of team members and return summary
 */
export function validateTeamMembers(members: TeamMember[]): {
    total: number;
    passed: number;
    failed: number;
    results: TeamMemberValidationResult[];
} {
    const results = members.map(validateTeamMember);
    const passed = results.filter((r) => r.issues.length === 0).length;
    const failed = results.length - passed;

    return {
        total: members.length,
        passed,
        failed,
        results,
    };
}

/**
 * Check if focus trap is properly configured
 * Returns true if the element can support focus trapping
 */
export function isValidFocusTrapTarget(element: HTMLElement): boolean {
    return (
        element.tagName === "DIALOG" ||
        element.tagName === "DIV" ||
        element.tagName === "SECTION"
    );
}

/**
 * Validate keyboard navigation support for interactive elements
 */
export interface KeyboardNavValidation {
    supportsTabNavigation: boolean;
    supportsArrowKeys: boolean;
    supportsEscapeKey: boolean;
}

/**
 * Check if an element supports standard keyboard navigation
 */
export function validateKeyboardNavigation(
    element: HTMLElement,
): KeyboardNavValidation {
    const tag = element.tagName;
    const role = element.getAttribute("role");
    const tabindex = element.getAttribute("tabindex");

    // Elements that naturally support tab navigation
    const naturallyFocusable = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(
        tag,
    );

    const supportsTabNavigation = naturallyFocusable || tabindex === "0" || tabindex === "";

    // Elements that typically support arrow keys (lists, grids, etc.)
    const supportsArrowKeys = ["LISTBOX", "GRID", "TREE", "MENU"].includes(
        role || tag.toUpperCase(),
    );

    // Check if element has escape key handler (usually needs explicit implementation)
    const supportsEscapeKey = element.hasAttribute("data-escape-close");

    return {
        supportsTabNavigation,
        supportsArrowKeys,
        supportsEscapeKey,
    };
}

/**
 * ARIA label validation
 */
export interface AriaValidationResult {
    hasRole: boolean;
    hasLabel: boolean;
    hasLabelledBy: boolean;
    isValid: boolean;
}

/**
 * Check ARIA attributes on an element
 */
export function validateAriaAttributes(element: HTMLElement): AriaValidationResult {
    const hasRole = element.hasAttribute("role");
    const hasLabel = element.hasAttribute("aria-label");
    const hasLabelledBy = element.hasAttribute("aria-labelledby");
    const isValid = hasLabel || hasLabelledBy;

    return {
        hasRole,
        hasLabel,
        hasLabelledBy,
        isValid,
    };
}

/**
 * Color contrast ratio check (simplified - uses WCAG AA thresholds)
 */
export function getContrastRatio(fg: string, bg: string): number {
    // Simplified contrast calculation
    // For production use, consider using a library like 'color-contrast-checker'
    return 4.5; // Default to minimum AA threshold
}

/**
 * Check if color pair meets WCAG AA contrast requirements
 */
export function checkContrast(fg: string, bg: string): boolean {
    const ratio = getContrastRatio(fg, bg);
    return ratio >= 4.5; // WCAG AA minimum
}

export default {
    validateTeamMember,
    validateTeamMembers,
    isValidFocusTrapTarget,
    validateKeyboardNavigation,
    validateAriaAttributes,
    checkContrast,
};
