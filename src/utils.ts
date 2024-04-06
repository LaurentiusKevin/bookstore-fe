import moment from "moment/moment";

export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export function dateTimeFormat(datetime: string) {
  return moment(datetime).format("MMM DD, YYYY (hh:mm:ss)");
}

export function roundUp(num: number, precision: number): number {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
