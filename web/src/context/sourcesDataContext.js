import React from 'react';

const SourcesDataContext = React.createContext();

function useSourcesData() {
  const context = React.useContext(SourcesDataContext);

  if (!context) {
    throw new Error(`useSourcesData must be used within a CountProvider`);
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
