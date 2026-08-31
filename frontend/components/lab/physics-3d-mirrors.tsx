"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConcaveMirror3D } from "./physics-3d-mirrors-concave";
import { ConvexMirror3D } from "./physics-3d-mirrors-convex";


export const Physics3DMirrors: React.FC = () => {
  return (
    <Tabs defaultValue="concave" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="concave">Concave Mirror</TabsTrigger>
        <TabsTrigger value="convex">Convex Mirror</TabsTrigger>
      </TabsList>
      
      <TabsContent value="concave" className="mt-4">
        <ConcaveMirror3D />
      </TabsContent>
      
      <TabsContent value="convex" className="mt-4">
        <ConvexMirror3D />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DMirrors;
