import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FinanceDashboardScreen from '../screens/finance-manager/dashboard/FinanceDashboardScreen';
import FeeStructureScreen from '../screens/finance-manager/fee-configuration/FeeStructureScreen';
import OnlinePaymentsScreen from '../screens/finance-manager/payment-management/OnlinePaymentsScreen';
import DefaulterListScreen from '../screens/finance-manager/dues-defaulters/DefaulterListScreen';
import FollowUpSystemScreen from '../screens/finance-manager/dues-defaulters/FollowUpSystemScreen';
import CollectionReportsScreen from '../screens/finance-manager/dues-defaulters/CollectionReportsScreen';
import DailyCollectionReportScreen from '../screens/finance-manager/financial-reports/DailyCollectionReportScreen';
import MonthlyReportScreen from '../screens/finance-manager/financial-reports/MonthlyReportScreen';
import CategoryBreakdownScreen from '../screens/finance-manager/financial-reports/CategoryBreakdownScreen';
import PaymentMethodAnalysisScreen from '../screens/finance-manager/financial-reports/PaymentMethodAnalysisScreen';
import ExportYearEndScreen from '../screens/finance-manager/financial-reports/ExportYearEndScreen';
import SalaryCalculationScreen from '../screens/finance-manager/payroll-processing/SalaryCalculationScreen';
import DeductionManagementScreen from '../screens/finance-manager/payroll-processing/DeductionManagementScreen';
import PayslipGenerationScreen from '../screens/finance-manager/payroll-processing/PayslipGenerationScreen';
import SalaryPaymentScreen from '../screens/finance-manager/payroll-processing/SalaryPaymentScreen';
import SalaryReportScreen from '../screens/finance-manager/payroll-processing/SalaryReportScreen';
import TaxCalculationScreen from '../screens/finance-manager/payroll-processing/TaxCalculationScreen';
import BankReconciliationScreen from '../screens/finance-manager/reconciliation/BankReconciliationScreen';
import CashBookScreen from '../screens/finance-manager/reconciliation/CashBookScreen';
import LedgerManagementScreen from '../screens/finance-manager/reconciliation/LedgerManagementScreen';
import AccountVerificationScreen from '../screens/finance-manager/reconciliation/AccountVerificationScreen';

const FinanceManagerRoute = () => (
  <Routes>
    <Route path="dashboard" element={<FinanceDashboardScreen />} />
    {/* Fee Configuration */}
    <Route path="fee-configuration/structure" element={<FeeStructureScreen />} />
   
    {/* Payment Management */}
    <Route path="payment-management/online" element={<OnlinePaymentsScreen />} />
  
    {/* Dues & Defaulters */}
    <Route path="dues-defaulters/defaulters" element={<DefaulterListScreen />} />
   
    <Route path="dues-defaulters/follow-up" element={<FollowUpSystemScreen />} />
    <Route path="dues-defaulters/collection-reports" element={<CollectionReportsScreen />} />
    {/* Financial Reports */}
    <Route path="financial-reports/daily" element={<DailyCollectionReportScreen />} />
    <Route path="financial-reports/monthly" element={<MonthlyReportScreen />} />
    <Route path="financial-reports/category-breakdown" element={<CategoryBreakdownScreen />} />
    <Route path="financial-reports/payment-method" element={<PaymentMethodAnalysisScreen />} />
    <Route path="financial-reports/export-year-end" element={<ExportYearEndScreen />} />
    {/* Payroll Processing */}
    <Route path="payroll/salary-calculation" element={<SalaryCalculationScreen />} />
    <Route path="payroll/deduction-management" element={<DeductionManagementScreen />} />
    <Route path="payroll/payslip-generation" element={<PayslipGenerationScreen />} />
    <Route path="payroll/salary-payment" element={<SalaryPaymentScreen />} />
    <Route path="payroll/salary-report" element={<SalaryReportScreen />} />
    <Route path="payroll/tax-calculation" element={<TaxCalculationScreen />} />
    {/* Reconciliation */}
    <Route path="reconciliation/bank" element={<BankReconciliationScreen />} />
    <Route path="reconciliation/cash-book" element={<CashBookScreen />} />
    <Route path="reconciliation/ledger" element={<LedgerManagementScreen />} />
    <Route path="reconciliation/account-verification" element={<AccountVerificationScreen />} />
  </Routes>
);

export default FinanceManagerRoute;
