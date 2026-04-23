import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const BRAND = {
  ink: "#0B1220",
  slate: "#475569",
  muted: "#64748B",
  line: "#E2E8F0",
  soft: "#F8FAFC",
  accent: "#0EA5E9",
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: BRAND.ink,
  },
  headerBand: {
    backgroundColor: BRAND.ink,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 92,
    height: 52,
    objectFit: "contain",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  companyName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "white",
    letterSpacing: 0.2,
  },
  companyMeta: {
    fontSize: 9,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  titleRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
  },
  quoteMeta: {
    alignItems: "flex-end",
  },
  quoteMetaLabel: {
    fontSize: 9,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  quoteMetaValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },
  infoGrid: {
    marginTop: 14,
    flexDirection: "row",
  },
  infoCard: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    backgroundColor: BRAND.soft,
    padding: 14,
  },
  infoCardTitle: {
    fontSize: 9,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  infoCardValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  infoCardSmall: {
    fontSize: 10,
    color: BRAND.slate,
    marginTop: 2,
  },
  table: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: BRAND.ink,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  th: {
    fontSize: 9,
    color: "rgba(255,255,255,0.85)",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: BRAND.line,
    backgroundColor: "#FFFFFF",
  },
  tableRowAlt: {
    backgroundColor: BRAND.soft,
  },
  td: {
    fontSize: 10.5,
    color: BRAND.ink,
  },
  tdMuted: {
    fontSize: 10,
    color: BRAND.slate,
  },
  colItem: { width: "46%" },
  colQty: { width: "12%", textAlign: "right" },
  colUnit: { width: "20%", textAlign: "right" },
  colLine: { width: "22%", textAlign: "right" },
  totalRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalCard: {
    width: 240,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    backgroundColor: BRAND.soft,
    padding: 14,
  },
  totalLabel: {
    fontSize: 9,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  totalValue: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: BRAND.ink,
  },
  notes: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  notesTitle: {
    fontSize: 9,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  notesBody: {
    fontSize: 10.5,
    color: BRAND.slate,
    lineHeight: 1.45,
  },
  signatureRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureBlock: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  signatureLabel: {
    fontSize: 9,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  signatureImage: {
    width: 160,
    height: 50,
    marginTop: 10,
    objectFit: "contain",
  },
  signatureLine: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: BRAND.line,
  },
  signatureName: {
    marginTop: 8,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  signatureTitle: {
    marginTop: 2,
    fontSize: 10,
    color: BRAND.slate,
  },
  footer: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: BRAND.muted,
    fontSize: 8.5,
  },
  footerChip: {
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: BRAND.soft,
  },
});

type QuoteItem = { description: string; quantity: number; price: number };

interface QuotationPDFProps {
  clientName: string;
  clientEmail: string;
  items: QuoteItem[];
  notes?: string;
  currency?: string;
  quoteNumber?: string;
  issuedAt?: string;
  logoDataUrl?: string;
  signatureDataUrl?: string;
  directorName?: string;
  directorTitle?: string;
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
}

const formatMoney = (amount: number, currency = "KES") => {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

const safeDate = (value?: string) => {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

export default function QuotationPDF({
  clientName,
  clientEmail,
  items,
  notes,
  currency = "KES",
  quoteNumber = "QTN",
  issuedAt,
  logoDataUrl,
  signatureDataUrl,
  directorName = "Kelvin Thuo",
  directorTitle = "Company Director",
  companyName = "Vickins Technologies",
  companyEmail = "info@vickinstechnologies.com",
  companyPhone = "+254 794 501 005",
  companyWebsite = "vickinstechnologies.com",
}: QuotationPDFProps) {
  const issuedDate = safeDate(issuedAt);
  const lineItems = (items ?? []).map((item) => ({
    ...item,
    lineTotal: (Number(item.quantity) || 0) * (Number(item.price) || 0),
  }));
  const overallTotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          {logoDataUrl ? <Image src={logoDataUrl} style={styles.logo} /> : null}
          <View style={styles.headerRight}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.companyMeta}>{companyEmail}</Text>
            <Text style={styles.companyMeta}>{companyPhone}</Text>
            <Text style={styles.companyMeta}>{companyWebsite}</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Quotation</Text>
          <View style={styles.quoteMeta}>
            <Text style={styles.quoteMetaLabel}>Quotation No.</Text>
            <Text style={styles.quoteMetaValue}>{quoteNumber}</Text>
            <Text style={[styles.quoteMetaLabel, { marginTop: 8 }]}>Date</Text>
            <Text style={styles.quoteMetaValue}>
              {issuedDate.toLocaleDateString("en-KE", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={[styles.infoCard, { marginRight: 12 }]}>
            <Text style={styles.infoCardTitle}>Prepared For</Text>
            <Text style={styles.infoCardValue}>{clientName || "Client"}</Text>
            <Text style={styles.infoCardSmall}>{clientEmail || "—"}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Currency</Text>
            <Text style={styles.infoCardValue}>{currency}</Text>
            <Text style={styles.infoCardSmall}>All prices shown in {currency}.</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colItem]}>Item (Product / Equipment / Task)</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colUnit]}>Unit Price</Text>
            <Text style={[styles.th, styles.colLine]}>Line Total</Text>
          </View>

          {lineItems.map((item, index) => (
            <View
              key={`${item.description}-${index}`}
              style={index % 2 === 0 ? [styles.tableRow, styles.tableRowAlt] : styles.tableRow}
            >
              <Text style={[styles.td, styles.colItem]}>{item.description}</Text>
              <Text style={[styles.tdMuted, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.tdMuted, styles.colUnit]}>
                {formatMoney(item.price, currency)}
              </Text>
              <Text style={[styles.td, styles.colLine]}>
                {formatMoney(item.lineTotal, currency)}
              </Text>
            </View>
          ))}

          {lineItems.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={[styles.tdMuted, { width: "100%" }]}>
                No items added yet.
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.totalRow}>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Overall Total</Text>
            <Text style={styles.totalValue}>{formatMoney(overallTotal, currency)}</Text>
          </View>
        </View>

        {notes ? (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesBody}>{notes}</Text>
          </View>
        ) : null}

        <View style={styles.signatureRow}>
          <View style={[styles.signatureBlock, { marginRight: 12 }]}>
            <Text style={styles.signatureLabel}>Authorized Signature</Text>
            {signatureDataUrl ? (
              <Image src={signatureDataUrl} style={styles.signatureImage} />
            ) : (
              <View style={styles.signatureLine} />
            )}
            <Text style={styles.signatureName}>{directorName}</Text>
            <Text style={styles.signatureTitle}>{directorTitle}</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={styles.signatureLabel}>Validity</Text>
            <Text style={[styles.td, { marginTop: 10 }]}>
              This quotation is valid for 14 days from the date issued.
            </Text>
            <Text style={[styles.tdMuted, { marginTop: 10 }]}>
              For questions, reply to {companyEmail}.
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerChip}>{companyName}</Text>
          <Text>Powered by premium design + engineering.</Text>
        </View>
      </Page>
    </Document>
  );
}
