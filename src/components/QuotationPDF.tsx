import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 10 },
  table: { display: 'flex', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#bfbfbf' },
  tableRow: { flexDirection: 'row' },
  tableCol: { borderStyle: 'solid', borderWidth: 1, borderColor: '#bfbfbf', padding: 5 },
  tableHeader: { backgroundColor: '#f0f0f0', fontFamily: 'Helvetica-Bold' },
  footer: { marginTop: 20, textAlign: 'right' },
});

interface QuotationPDFProps {
  clientName: string;
  clientEmail: string;
  items: { description: string; quantity: number; price: number }[];
  notes: string;
  total: string;
}

const QuotationPDF = ({ clientName, clientEmail, items, notes, total }: QuotationPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Vickins Quotation</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.section}>
        <Text>To: {clientName} ({clientEmail})</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={[styles.tableCol, { width: '50%' }]}><Text>Description</Text></View>
          <View style={[styles.tableCol, { width: '15%' }]}><Text>Quantity</Text></View>
          <View style={[styles.tableCol, { width: '20%' }]}><Text>Price</Text></View>
          <View style={[styles.tableCol, { width: '15%' }]}><Text>Total</Text></View>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.tableCol, { width: '50%' }]}><Text>{item.description}</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text>{item.quantity}</Text></View>
            <View style={[styles.tableCol, { width: '20%' }]}><Text>${item.price.toFixed(2)}</Text></View>
            <View style={[styles.tableCol, { width: '15%' }]}><Text>${(item.quantity * item.price).toFixed(2)}</Text></View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text>Total: ${total}</Text>
      </View>
      {notes && (
        <View style={styles.section}>
          <Text>Notes: {notes}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default QuotationPDF;