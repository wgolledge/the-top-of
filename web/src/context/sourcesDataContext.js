import React from 'react';

export const SourcesDataContext = React.createContext();

function useSourcesData() {
  const context = React.useContext(SourcesDataContext);

  if (!context) {
    throw new Error(`useSourcesData must be used within a SourcesDataProvider`);
  }
  return context;
}
function SourcesDataProvider(props) {
  const [sourcesData, setSourcesData] = React.useState(null);

  return (
    <SourcesDataContext.Provider
      value={[sourcesData, setSourcesData]}
      {...props}
    />
  );
}
export { SourcesDataProvider, useSourcesData };
