import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { BookOpen, FlaskConical, GraduationCap } from "lucide-react";

const CLASS_11 = "🎓 Class 11";
const CLASS_12 = "🎓 Class 12";
const LAB = "🔬 Interactive Lab";
const CLASS_11_NOTES = "📚 Class 11 Notes";

const CLASS_11_DESCRIPTION = "Complete syllabus with notes and resources";
const CLASS_12_DESCRIPTION = "Complete syllabus with notes and resources";
const LAB_DESCRIPTION = "Physics, Chemistry, and Math simulations";
const CLASS_11_NOTES_DESCRIPTION = "Subject notes and study materials";

const CardWithIcon = ({ icon, title, description, href }) => (
  <Link href={href}>
    <Card className="h-full transition-all hover:border-primary hover:shadow-lg card-with-icon nav-card group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <IconBadge icon={icon} variant="primary" className="card-icon" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6 md:py-10 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">📝 Educational Platform</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Syllabus-first learning: pick a class, read the syllabus, then explore notes and labs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardWithIcon icon={GraduationCap} title={CLASS_11} description={CLASS_11_DESCRIPTION} href="/class-11" />
        <CardWithIcon icon={GraduationCap} title={CLASS_12} description={CLASS_12_DESCRIPTION} href="/class-12" />
        <CardWithIcon icon={FlaskConical} title={LAB} description={LAB_DESCRIPTION} href="/lab" />
        <CardWithIcon icon={BookOpen} title={CLASS_11_NOTES} description={CLASS_11_NOTES_DESCRIPTION} href="/class-11-notes" />
      </div>
    </div>
  );
}
