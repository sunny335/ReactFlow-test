import {
  ReactFlowProvider
} from "reactflow";
import  DataFlow  from './pages/DataFlow/DataFlow';
import { ThemeProvider } from '@mui/system';
import theme from './assets/Theme';
import FlowAuthApi from "./Context/FlowAuth";
import DataExplorerApi  from "./Context/DataExplorerViewInfoApi";
import { HoverProvider } from "./Context/HoverContext";
// import DataExplorer from "./components/DataExplorerChart/DataExplorer"
import { SciChartSurface, SciChart3DSurface } from "scichart";
function App() {
  SciChartSurface.useWasmFromCDN();
  SciChart3DSurface.useWasmFromCDN();
  return (
    <FlowAuthApi>
      <HoverProvider>

      <DataExplorerApi>
      <ReactFlowProvider>
      <ThemeProvider theme={theme}>
        <DataFlow />
        {/* <DataExplorer /> */}
      </ThemeProvider>
    </ReactFlowProvider>

      </DataExplorerApi>
      </HoverProvider>
     
    
    </FlowAuthApi>
  );
}
export default App;
