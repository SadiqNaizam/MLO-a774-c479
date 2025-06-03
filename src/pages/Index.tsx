import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import TreeView from '../components/TreeView/TreeView';

/**
 * IndexPage serves as the main entry point for the "Tree View Manager" feature.
 * It utilizes the MainAppLayout to provide the standard page structure (sidebar, header)
 * and renders the TreeView component as its primary content.
 *
 * The TreeView component is self-contained, managing its own data (including initial dummy data)
 * and state (such as open nodes, selections, and search terms).
 * This page component focuses solely on composing the layout and the main feature component.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* The TreeView component handles the display and interaction with the hierarchical data */}
      <TreeView />
    </MainAppLayout>
  );
};

export default IndexPage;
