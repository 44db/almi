import React from 'react';
import { EmployeeOption } from '@/appTypes/employee';

interface AttendanceProps<T> {
    employee: T;
    disabledForm: boolean;
    setEventEmployees: (employees: T[]) => void;
    eventEmployees: T[];
}

const Attendance: React.FC<AttendanceProps<EmployeeOption>> = ({ employee, disabledForm, setEventEmployees, eventEmployees }) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventEmployees(
            eventEmployees.map(
                (emp: EmployeeOption) =>
                    emp.value === employee.value
                        ? { ...emp, attendanceType: e.target.value, }
                        : emp
            )
        )
    }

    return (
        <div className="mt-4">
            <h3 className="block text-gray-700 text-sm font-semibold mb-2">
                Attendance
            </h3>

            <label className="block text-gray-700 text-sm mb-2">
                <input
                    className="mr-1"
                    type="radio"
                    name={`attendanceType-${employee.value}`}
                    value="Physically"
                    checked={employee.attendanceType === 'Physically'}
                    disabled={disabledForm}
                    onChange={handleOnChange}
                />
                Physically
            </label>

            <label className="block text-gray-700 text-sm mb-2">
                <input
                    className="mr-1"
                    type="radio"
                    name={`attendanceType-${employee.value}`}
                    value="Remotely"
                    checked={employee.attendanceType === 'Remotely'}
                    disabled={disabledForm}
                    onChange={handleOnChange}
                />
                Remotely
            </label>
        </div>
    );
}

export default Attendance;
