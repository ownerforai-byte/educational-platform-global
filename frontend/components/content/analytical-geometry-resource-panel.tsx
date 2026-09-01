/**
 * Analytical Geometry Resource Panel - Component to display the PDF resource
 * with 3D visual links on the topic page
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, BookOpen, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticalGeometryResourcePanelProps {
  resourceUrl: string;
  className?: string;
}

export const AnalyticalGeometryResourcePanel: React.FC<AnalyticalGeometryResourcePanelProps> = ({
  resourceUrl,
  className = ""
}) => {
  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Analytical Geometry Exercises
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Comprehensive exercise set with solutions and 3D visualizations
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-300">
          <FileText className="w-4 h-4" />
          <span>PDF Exercise Book</span>
          <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">30 Pages</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            variant="default"
          >
            <a href={resourceUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open PDF
            </a>
          </Button>

          <Button
            asChild
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            variant="outline"
          >
            <a href="/lab/math-3d-geometry" target="_blank" rel="noopener noreferrer">
              <PlayCircle className="w-4 h-4 mr-2" />
              3D Geometry Lab
            </a>
          </Button>
        </div>

        <div className="text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
          <strong>3D Visuals Included:</strong> Points, lines, planes, perpendicular distances with labeled diagrams
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticalGeometryResourcePanel;
