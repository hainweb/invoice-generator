import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  invoiceInfo: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  address: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f3f4f6',
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tableCell: {
    fontSize: 10,
    color: '#374151',
  },
  descriptionCell: {
    flex: 3,
  },
  quantityCell: {
    flex: 1,
    textAlign: 'center',
  },
  rateCell: {
    flex: 1,
    textAlign: 'right',
  },
  amountCell: {
    flex: 1,
    textAlign: 'right',
  },
  totalsSection: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  notes: {
    marginTop: 30,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
});

const InvoicePDF = ({ invoiceData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.invoiceInfo}>
            <Text>Invoice #{invoiceData.invoice.number}</Text>
            <Text>Date: {formatDate(invoiceData.invoice.date)}</Text>
            <Text>Due Date: {formatDate(invoiceData.invoice.dueDate)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>From:</Text>
              <View style={styles.address}>
                {invoiceData.business.name && <Text>{invoiceData.business.name}</Text>}
                {invoiceData.business.address && <Text>{invoiceData.business.address}</Text>}
                {(invoiceData.business.city || invoiceData.business.state || invoiceData.business.zipCode) && (
                  <Text>
                    {invoiceData.business.city}
                    {invoiceData.business.city && invoiceData.business.state && ', '}
                    {invoiceData.business.state} {invoiceData.business.zipCode}
                  </Text>
                )}
                {invoiceData.business.email && <Text>{invoiceData.business.email}</Text>}
                {invoiceData.business.phone && <Text>{invoiceData.business.phone}</Text>}
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.sectionTitle}>To:</Text>
              <View style={styles.address}>
                {invoiceData.client.name && <Text>{invoiceData.client.name}</Text>}
                {invoiceData.client.address && <Text>{invoiceData.client.address}</Text>}
                {(invoiceData.client.city || invoiceData.client.state || invoiceData.client.zipCode) && (
                  <Text>
                    {invoiceData.client.city}
                    {invoiceData.client.city && invoiceData.client.state && ', '}
                    {invoiceData.client.state} {invoiceData.client.zipCode}
                  </Text>
                )}
                {invoiceData.client.email && <Text>{invoiceData.client.email}</Text>}
                {invoiceData.client.phone && <Text>{invoiceData.client.phone}</Text>}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.descriptionCell]}>Description</Text>
            <Text style={[styles.tableHeaderCell, styles.quantityCell]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, styles.rateCell]}>Rate</Text>
            <Text style={[styles.tableHeaderCell, styles.amountCell]}>Amount</Text>
          </View>

          {invoiceData.invoiceItem.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.descriptionCell]}>
                {item.description || 'Item description'}
              </Text>
              <Text style={[styles.tableCell, styles.quantityCell]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.rateCell]}>₹{Number(item.rate).toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.amountCell]}>₹{Number(item.amount).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹{invoiceData.subtotal.toFixed(2)}</Text>
          </View>

          {parseFloat(invoiceData.additionalInfo.taxRate) > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax ({invoiceData.additionalInfo.taxRate}%):</Text>
              <Text style={styles.totalValue}>₹{invoiceData.taxAmount.toFixed(2)}</Text>
            </View>
          )}

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>₹{invoiceData.total.toFixed(2)}</Text>
          </View>
        </View>

        {invoiceData.additionalInfo.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes:</Text>
            <Text style={styles.notesText}>{invoiceData.additionalInfo.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export const generatePDF = async (invoiceData) => {
  const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${invoiceData.invoice.number}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
