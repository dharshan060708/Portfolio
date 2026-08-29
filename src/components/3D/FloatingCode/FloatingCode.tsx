'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCodeProps {
  position?: [number, number, number];
  count?: number;
  scale?: number;
}

export function FloatingCode({ 
  position = [0, 0, 0], 
  count = 6, 
  scale = 1 
}: FloatingCodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const snippetsRef = useRef<THREE.Group[]>([]);

  const codeSnippets = [
    `async function fetchAI(prompt) {\n  const res = await fetch('/api/chat', {\n    method: 'POST',\n    body: JSON.stringify({ prompt })\n  });\n  return res.json();\n}`,
    `class RAGPipeline:\n    def __init__(self):\n        self.vector_db = ChromaDB()\n        self.embedder = SentenceTransformer()\n    \n    def query(self, q: str):\n        docs = self.vector_db.similarity_search(q)\n        return self.llm.generate(q, docs)`,
    `workflow:\n  - trigger: webhook\n  - validate: input\n  - ai: classify\n  - store: sheets\n  - notify: email\n  - create: trello\n  - respond: 200 OK`,
    `SELECT * FROM leads\nWHERE score > 0.8\nAND created_at > NOW() - INTERVAL '7 days'\nORDER BY score DESC\nLIMIT 50;`,
    `docker run -d \\\n  --name meridian-api \\\n  -p 8000:8000 \\\n  -e OPENAI_KEY=\${KEY} \\\n  -e CHROMA_HOST=db \\\n  ghcr.io/user/meridian:latest`,
    `npx create-next-app@latest my-ai-app \\\n  --typescript --tailwind --eslint \\\n  --app --src-dir --import-alias "@/*"`,
    `ollama run llama3.2:3b \\\n  "Explain RAG in 3 sentences"\n\nResponse: RAG combines retrieval\nwith generation to ground LLM\noutputs in external knowledge.`,
    `// Type-safe API client\nconst api = createClient<API>(\n  '/api/v1',\n  {\n    headers: {\n      'Authorization': \`Bearer \${token}\`\n    }\n  }\n);`,
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02;
    }

    snippetsRef.current.forEach((snippetGroup, i) => {
      if (snippetGroup) {
        snippetGroup.position.y = position[1] + Math.sin(time * 0.5 + i) * 0.15;
        snippetGroup.rotation.y = Math.sin(time * 0.3 + i) * 0.05;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: count }).map((_, i) => {
        const snippet = codeSnippets[i % codeSnippets.length];
        const angle = (i / count) * Math.PI * 2;
        const radius = 1.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.5;
        
        return (
          <CodeSnippet
            key={i}
            position={[x, y, z]}
            index={i}
            snippet={snippet}
            color={i % 2 === 0 ? '#D4AF37' : '#00FFFF'}
          />
        );
      })}
    </group>
  );
}

interface CodeSnippetProps {
  position: [number, number, number];
  index: number;
  snippet: string;
  color: string;
}

function CodeSnippet({ 
  position, 
  index, 
  snippet, 
  color 
}: CodeSnippetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const lines = snippet.split('\n').slice(0, 8);

  const content = useMemo(() => (
    <>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <span style={dotStyle} />
          <span style={dotStyle} />
          <span style={dotStyle} />
          <span style={filenameStyle}>snippet_{index}.py</span>
        </div>
        <pre style={codeStyle}>
          <code>
            {lines.map((line, i) => (
              <div key={i} style={lineStyle}>
                <span style={lineNumberStyle}>{String(i + 1).padStart(2, '0')}</span>
                <span style={highlightLine(line)}>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </>
  ), [snippet, index, color]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.1 + Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox
        ref={meshRef}
        args={[1.8, 1.4, 0.03]}
        radius={0.015}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#0D1117" 
          roughness={0.3} 
          metalness={0.4} 
          envMapIntensity={0.5}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      <Html
        position={[0, 0, 0.06]}
      >
        {content}
      </Html>

      <mesh position={[-0.88, 0.68, 0.05]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function highlightLine(line: string): React.CSSProperties {
  if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
    return { color: '#8B949E', fontStyle: 'italic' };
  }
  if (line.includes('def ') || line.includes('function') || line.includes('class ')) {
    return { color: '#FF7B72', fontWeight: 500 };
  }
  if (line.includes('async') || line.includes('await') || line.includes('return')) {
    return { color: '#D2A8FF' };
  }
  if (line.includes('"') || line.includes("'") || line.includes('`')) {
    return { color: '#A5D6FF' };
  }
  return { color: '#E6EDF3' };
}

const cardStyle: React.CSSProperties = {
  background: '#0D1117',
  borderRadius: '6px',
  overflow: 'hidden',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '9px',
  lineHeight: '1.4',
  color: '#E6EDF3',
  width: '100%',
  height: '100%',
  border: '1px solid rgba(255,255,255,0.05)',
};

const headerStyle: React.CSSProperties = {
  background: '#161B22',
  borderBottom: '1px solid #30363D',
  padding: '4px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const dotStyle: React.CSSProperties = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: '#30363D',
  display: 'block',
};

const filenameStyle: React.CSSProperties = {
  color: '#8B949E',
  fontSize: '8px',
  marginLeft: '6px',
};

const codeStyle: React.CSSProperties = {
  padding: '6px 8px',
  margin: 0,
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const lineStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
  padding: '1px 0',
};

const lineNumberStyle: React.CSSProperties = {
  color: '#484F58',
  fontSize: '8px',
  minWidth: '18px',
  textAlign: 'right',
  userSelect: 'none',
};