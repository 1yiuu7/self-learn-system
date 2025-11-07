import React, { useState, useMemo } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
    onLogin: (role: UserRole) => void;
}

const FuhsingLogo: React.FC = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#4A90E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V22" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V12" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 7V17" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 7V17" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const FormInput: React.FC<{ label: string; type?: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, type = "text", id, value, onChange }) => (
    <div className="flex items-center mb-5">
        <label htmlFor={id} className="w-16 sm:w-20 text-base sm:text-lg font-medium text-gray-700 shrink-0">{label}</label>
        <input type={type} id={id} value={value} onChange={onChange} className="w-full py-2.5 px-4 bg-gray-200 rounded-full border-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 transition" />
    </div>
);

const LoginCard: React.FC<{ title: string; children: React.ReactNode; onConfirm: () => void; confirmLabel: string; isDisabled: boolean; }> = ({ title, children, onConfirm, confirmLabel, isDisabled }) => (
    <section className="mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">{title}</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {children}
            <button 
                onClick={onConfirm} 
                disabled={isDisabled}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {confirmLabel}
            </button>
        </div>
    </section>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [studentClass, setStudentClass] = useState('');
    const [studentSeat, setStudentSeat] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    
    const [teacherAccount, setTeacherAccount] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');

    const isStudentLoginDisabled = useMemo(() => {
        return !studentClass || !studentSeat || !studentName || !studentId;
    }, [studentClass, studentSeat, studentName, studentId]);

    const isTeacherLoginDisabled = useMemo(() => {
        return !teacherAccount || !teacherPassword;
    }, [teacherAccount, teacherPassword]);

    return (
        <div className="py-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center mb-10">
                <FuhsingLogo />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">臺北市立復興高級中學</h1>
                <p className="text-lg sm:text-xl text-gray-600 mt-1">自主學習計畫 學生申請系統</p>
            </div>

            <LoginCard title="學生登入" onConfirm={() => onLogin(UserRole.Student)} confirmLabel="學生登入" isDisabled={isStudentLoginDisabled}>
                <FormInput label="班級" id="student-class" value={studentClass} onChange={e => setStudentClass(e.target.value)} />
                <FormInput label="座號" id="student-seat" value={studentSeat} onChange={e => setStudentSeat(e.target.value)} />
                <FormInput label="姓名" id="student-name" value={studentName} onChange={e => setStudentName(e.target.value)} />
                <FormInput label="學號" id="student-id" value={studentId} onChange={e => setStudentId(e.target.value)} />
            </LoginCard>

            <LoginCard title="教師登入" onConfirm={() => onLogin(UserRole.Teacher)} confirmLabel="教師登入" isDisabled={isTeacherLoginDisabled}>
                <FormInput label="帳號" id="teacher-account" value={teacherAccount} onChange={e => setTeacherAccount(e.target.value)} />
                <FormInput label="密碼" type="password" id="teacher-password" value={teacherPassword} onChange={e => setTeacherPassword(e.target.value)} />
            </LoginCard>
        </div>
    );
};

export default LoginPage;
