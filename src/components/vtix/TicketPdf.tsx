import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

type TicketPdfProps = {
  eventTitle: string;
  eventDate: string;
  venue?: string;
  ticketType: string;
  qrDataUrl?: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    color: "#667085",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  section: {
    marginBottom: 12,
  },
  qr: {
    width: 160,
    height: 160,
    marginTop: 12,
  },
  ticketBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
});

export default function TicketPdf({
  eventTitle,
  eventDate,
  venue,
  ticketType,
  qrDataUrl,
}: TicketPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.label}>V-Tix Africa by Vickins Technologies</Text>
        <Text style={styles.header}>{eventTitle}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Event Date</Text>
          <Text>{eventDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Venue</Text>
          <Text>{venue || "Venue"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Ticket Type</Text>
          <Text>{ticketType}</Text>
        </View>
        <View style={styles.ticketBox}>
          <Text style={styles.label}>QR Code</Text>
          {qrDataUrl ? <Image src={qrDataUrl} style={styles.qr} /> : <Text>QR unavailable</Text>}
        </View>
      </Page>
    </Document>
  );
}
