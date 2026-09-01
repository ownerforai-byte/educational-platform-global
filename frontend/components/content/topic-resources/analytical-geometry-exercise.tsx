/**
 * Analytical Geometry Exercise Resource Component
 * Integrates PDF resource with 3D visuals for the analytic-geometry topic
 */

'use client';

import React from 'react';
import { AnalyticalGeometryResourcePanel } from '../analytical-geometry-resource-panel';
import { MathGeometry3D } from '@/components/lab/math-geometry-3d';
import { MathPerpendicular3D } from '@/components/lab/math-perpendicular-3d';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticalGeometryExerciseProps {
  pdfUrl: string;
}

export const AnalyticalGeometryExercise: React.FC<AnalyticalGeometryExerciseProps> = ({ pdfUrl }) => {
  return (
    <div className="space-y-6">
      {/* PDF Resource Panel */}
      <div className="max-w-4xl mx-auto">
        <AnalyticalGeometryResourcePanel resourceUrl={pdfUrl} />
      </div>

      {/* 3D Visuals Section */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Interactive 3D Visualizations
        </h3>

        <Tabs defaultValue="3d-geometry" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="3d-geometry">3D Geometry</TabsTrigger>
            <TabsTrigger value="perpendicular">Perpendicular Distance</TabsTrigger>
          </TabsList>

          <TabsContent value="3d-geometry">
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
              <MathGeometry3D />
            </div>
          </TabsContent>

          <TabsContent value="perpendicular">
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
              <MathPerpendicular3D />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
