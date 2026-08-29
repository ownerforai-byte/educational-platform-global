import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Topic {
  id: string;
  title: string;
}

const getTopics = async (chapterId: string) => {
  // Mock data for demonstration purposes
  return [
    { id: '1', title: 'Topic 1' },
    { id: '2', title: 'Topic 2' },
    { id: '3', title: 'Topic 3' },
  ];
};

export default function TopicPage() {
  const { chapterId } = useParams();
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchTopics() {
      if (chapterId) {
        const topicsData = await getTopics(chapterId as string);
        setTopics(topicsData);
      }
    }
    fetchTopics();
  }, [chapterId]);

  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <a href={`/subjects/[subjectId]/chapters/${chapterId}/topics/${topic.id}`}>{topic.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
