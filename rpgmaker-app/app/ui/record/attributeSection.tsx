import { fetchCardData } from '@/app/lib/data';

export default async function AttributeSectionWrapper({
  attribute, value
}: {
  attribute: string, value: number
}) {

  const {
    attribute1,
    attribute2,
    attribute3,
    attribute4
  } = await fetchAttributeData(attribute, value);

  return (
    <>
      <AttributeSection>

      </AttributeSection>
    </>
  );
}

export function AttributeSection() {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">Força</h3>
      </div>
      <div>
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </div>
  );
}
