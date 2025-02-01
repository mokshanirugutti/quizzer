import { Tabs, Tab, Card, CardBody } from "@heroui/react";

interface TabedCardProps {
  studyMaterial: string[];
  practiceMaterial: string[];
}

export default function TabedCard({ studyMaterial, practiceMaterial }: TabedCardProps) {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="study" title="Study Material">
          <Card>
            <CardBody>
              {studyMaterial.map((section, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: section }} className="leading-7"/>
              ))}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="practice" title="Practice Session">
          <Card>
            <CardBody>
              {practiceMaterial.map((content, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: content }} />
              ))}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}