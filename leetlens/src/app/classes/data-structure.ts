import { Theme } from '../constants/Theme';
import { EdgeSegment } from './edge-segment';

class DataStructure {
  canvasBgColor = Theme.CanvasBgColor;
  maxCellSize = 50;
  maxRadius = 50;
  minRadius = 11;
  edgeColor = Theme.EdgeColor;
  nodeColor = Theme.NodeColor;
  nodeFontSize = Theme.NodeFontSize;
  nodeFontFamily = Theme.NodeFontFamily;
  nodeFontColor = Theme.NodeFontColor;
}

export { DataStructure, EdgeSegment };
