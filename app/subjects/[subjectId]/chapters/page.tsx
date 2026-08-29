import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  title: string;
}

const getChapters = async (subjectId: string) => {
  // Mock data for demonstration purposes
  return [
    { id: '1', title: 'Chapter 1' },
    { id: '2', title: 'Chapter 2' },
    { id: '3', title: 'Chapter 3' },
  ];
};

export default function ChapterPage() {
  const { subjectId } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    async function fetchChapters() {
      if (subjectId) {
        const chaptersData = await getChapters(subjectId as string);
        setChapters(chaptersData);
      }
    }
    fetchChapters();
  }, [subjectId]);

  return (
    <div>
      <h1>Chapters</h1>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a href={`/subjects/${subjectId}/chapters/${chapter.id}`}>{chapter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
