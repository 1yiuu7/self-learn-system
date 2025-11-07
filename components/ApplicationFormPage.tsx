import React, { useState, useEffect } from 'react';
import { Application } from '../types';

interface ApplicationFormPageProps {
    applicationToEdit: Application | null;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2 mb-4">{title}</h2>
        {children}
    </div>
);

const InputField: React.FC<{ label: string; id: string; type?: string; placeholder?: string; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;}> = ({ label, id, ...props }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input id={id} {...props} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

const TextAreaField: React.FC<{ label: string; id: string; rows?: number; }> = ({ label, id, rows = 3 }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea id={id} rows={rows} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
    </div>
);

const RadioGroup: React.FC<{ legend: string; name: string; options: string[] }> = ({ legend, name, options }) => (
    <fieldset className="mb-4">
        <legend className="block text-sm font-medium text-gray-700 mb-2">{legend}</legend>
        <div className="flex items-center space-x-4">
            {options.map(option => (
                <div key={option} className="flex items-center">
                    <input id={`${name}-${option}`} name={name} type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                    <label htmlFor={`${name}-${option}`} className="ml-2 block text-sm text-gray-900">{option}</label>
                </div>
            ))}
        </div>
    </fieldset>
);

const StudentInfo: React.FC<{ title: string; memberId: number; }> = ({ title }) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="學號" id={`s-id`} value="" onChange={() => {}} />
            <InputField label="班級" id={`s-class`} value="" onChange={() => {}} />
            <InputField label="座號" id={`s-seat`} value="" onChange={() => {}} />
        </div>
        <RadioGroup legend="是否繳交過自主學習成果" name={`s-submitted`} options={['是', '否']} />
    </div>
);

interface PlanItem {
    id: number;
    date: string;
    content: string;
    hours: string;
    metric: string;
}

const ApplicationFormPage: React.FC<ApplicationFormPageProps> = ({ applicationToEdit }) => {
    const [planItems, setPlanItems] = useState<PlanItem[]>([{ id: 1, date: '', content: '', hours: '', metric: '' }]);
    const [projectTitle, setProjectTitle] = useState('');

    useEffect(() => {
        if (applicationToEdit) {
            setProjectTitle(applicationToEdit.title);
            // Here you would populate the rest of the form fields from applicationToEdit
        } else {
            // Clear fields for a new form
            setProjectTitle('');
            setPlanItems([{ id: 1, date: '', content: '', hours: '', metric: '' }]);
        }
    }, [applicationToEdit]);

    const addPlanItem = () => {
        setPlanItems([...planItems, { id: Date.now(), date: '', content: '', hours: '', metric: '' }]);
    };

    const removePlanItem = (id: number) => {
        setPlanItems(planItems.filter(item => item.id !== id));
    };

    const learningCategories = ["閱讀計畫", "專題研究", "技藝學習", "實作體驗", "志工服務", "藝文創作", "競賽準備", "課程延伸"];
    const envNeeds = ["自習室", "數位閱讀室", "雲端教室", "美力教室"];

    return (
        <form>
            <Section title="自主學習計畫名稱">
                <InputField label="" id="project-title" placeholder="請輸入計畫名稱" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
            </Section>

            <Section title="學生資料 (小組至多3人,可共用1份)">
                <StudentInfo title="組長" memberId={0} />
                <StudentInfo title="組員 1" memberId={1} />
                <StudentInfo title="組員 2" memberId={2} />
            </Section>

            <Section title="學習動機">
                <TextAreaField label="" id="motivation" />
            </Section>
            
            <Section title="學習類別">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {learningCategories.map(cat => (
                         <div key={cat} className="flex items-center">
                            <input id={cat} name="learning-category" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label htmlFor={cat} className="ml-2 block text-sm text-gray-900">{cat}</label>
                        </div>
                    ))}
                </div>
                 <InputField label="其他" id="category-other" placeholder="請說明" value="" onChange={() => {}} />
            </Section>
            
            <Section title="學習環境需求">
                <h4 className="font-medium text-gray-600 mb-2">A. 圖書館場地</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                   {envNeeds.map(env => (
                         <div key={env} className="flex items-center">
                            <input id={env} name="env-need" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label htmlFor={env} className="ml-2 block text-sm text-gray-900">{env}</label>
                        </div>
                    ))}
                </div>
                <InputField label="B. 其他場地" id="env-other" placeholder="須徵得該場地管理者同意並簽名" value="" onChange={() => {}} />
            </Section>

            <Section title="學習內容規劃 (至少需18小時)">
                {planItems.map((item, index) => (
                    <div key={item.id} className="relative border rounded-lg p-4 mb-4 pr-12">
                         <h4 className="font-semibold text-gray-600 mb-2">項次 {index + 1}</h4>
                        <InputField label="日期" id={`plan-date-${item.id}`} type="date" value="" onChange={() => {}}/>
                        <TextAreaField label="學習內容" id={`plan-content-${item.id}`} rows={2}/>
                        <InputField label="時數" id={`plan-hours-${item.id}`} type="number" value="" onChange={() => {}}/>
                        <InputField label="學生自訂檢核指標" id={`plan-metric-${item.id}`} value="" onChange={() => {}}/>
                        {planItems.length > 1 && (
                             <button type="button" onClick={() => removePlanItem(item.id)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-2xl font-bold leading-none">
                                &times;
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addPlanItem} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">+ 新增項次</button>
            </Section>

            <Section title="成果發表形式">
                <RadioGroup legend="請選擇發表形式" name="presentation-format" options={['靜態展 (PPT、書面報告等)', '動態展 (影片、實際展示等)']} />
                 <InputField label="其他" id="presentation-other" placeholder="請說明" value="" onChange={() => {}}/>
            </Section>

            <Section title="簽章">
                <div className="space-y-3">
                    {['組長簽名', '組長父母或監護人簽名', '組員1簽名', '組員1父母或監護人簽名', '指導教師簽章', '導師簽章', '空間設備管理人簽章'].map(sig => (
                         <div key={sig} className="flex items-center">
                            <input id={sig} name={sig} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor={sig} className="ml-2 block text-sm text-gray-900">{sig}</label>
                        </div>
                    ))}
                </div>
            </Section>

            <div className="mt-8">
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                    完成並儲存
                </button>
            </div>
        </form>
    );
};

export default ApplicationFormPage;