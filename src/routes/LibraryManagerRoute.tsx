import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LibraryFinance from '../screens/admin/finance/LibraryFinance';
import BookIssueReturnScreen from '../screens/non-teaching-staff/library-tools/BookIssueReturnScreen';
import FineCollectionScreen from '../screens/non-teaching-staff/library-tools/FineCollectionScreen';
import BookSearchScreen from '../screens/non-teaching-staff/library-tools/BookSearchScreen';
import InventoryManagementScreen from '../screens/non-teaching-staff/library-tools/InventoryManagementScreen';

const LibraryManagerRoute = () => (
  <Routes>
    <Route path="dashboard" element={<LibraryFinance />} />
    <Route path="book-issue-return" element={<BookIssueReturnScreen />} />
    <Route path="fine-collection" element={<FineCollectionScreen />} />
    <Route path="book-search" element={<BookSearchScreen />} />
    <Route path="inventory-management" element={<InventoryManagementScreen />} />
  </Routes>
);

export default LibraryManagerRoute;
