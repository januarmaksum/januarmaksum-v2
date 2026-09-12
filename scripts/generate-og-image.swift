import AppKit
import Foundation

let root = URL(fileURLWithPath: #filePath).deletingLastPathComponent().deletingLastPathComponent()
let portraitURL = root.appendingPathComponent("src/assets/januar-maksum.png")
let outputURL = root.appendingPathComponent("public/og-image.png")
let size = NSSize(width: 1200, height: 630)

guard let portrait = NSImage(contentsOf: portraitURL),
      let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: Int(size.width),
        pixelsHigh: Int(size.height),
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bitmapFormat: .alphaFirst,
        bytesPerRow: 0,
        bitsPerPixel: 0
      ) else {
  fatalError("Unable to load the portrait or create the PNG canvas.")
}

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)

let heroBackground = NSColor(calibratedRed: 242 / 255, green: 236 / 255, blue: 225 / 255, alpha: 1)
let ink = NSColor(calibratedRed: 17 / 255, green: 17 / 255, blue: 17 / 255, alpha: 1)
let lime = NSColor(calibratedRed: 232 / 255, green: 1, blue: 63 / 255, alpha: 1)
let orange = NSColor(calibratedRed: 197 / 255, green: 58 / 255, blue: 24 / 255, alpha: 1)

heroBackground.setFill()
NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()

let portraitDestination = NSRect(x: 700, y: 92, width: 430, height: 446)
let portraitSource = NSRect(x: 0, y: 0, width: 1231, height: 1277)
portrait.draw(in: portraitDestination, from: portraitSource, operation: .sourceOver, fraction: 1)

orange.setFill()
NSBezierPath(rect: NSRect(x: 78, y: 170, width: 420, height: 8)).fill()

func drawText(_ text: String, at point: NSPoint, font: NSFont, color: NSColor, tracking: CGFloat = 0) {
  let attributes: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: color,
    .kern: tracking,
  ]
  NSAttributedString(string: text, attributes: attributes).draw(at: point)
}

drawText("JANUAR", at: NSPoint(x: 78, y: 408), font: NSFont(name: "Arial-BoldMT", size: 84)!, color: ink, tracking: -4)
drawText("MAKSUM", at: NSPoint(x: 82, y: 316), font: NSFont(name: "Arial-BoldMT", size: 84)!, color: lime, tracking: -4)
drawText("MAKSUM", at: NSPoint(x: 78, y: 320), font: NSFont(name: "Arial-BoldMT", size: 84)!, color: orange, tracking: -4)
drawText("FRONTEND ENGINEER", at: NSPoint(x: 82, y: 244), font: NSFont(name: "ArialMT", size: 28)!, color: ink, tracking: 1)
drawText("WEBSITES / WEB APPS / MOBILE APPS", at: NSPoint(x: 82, y: 122), font: NSFont(name: "ArialMT", size: 17)!, color: NSColor(white: 0.38, alpha: 1), tracking: 0.6)

NSGraphicsContext.restoreGraphicsState()

guard let data = bitmap.representation(using: .png, properties: [:]) else {
  fatalError("Unable to encode the OG image as PNG.")
}

try data.write(to: outputURL)
