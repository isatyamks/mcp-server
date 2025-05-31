import os
import pandas as pd
import random
from datetime import datetime, timedelta

SSN_KEYS = {
    "CS2023FALL": "B23CS",
    "CS2024SPRING": "B24CS",
    "IT2023FALL": "B23IT",
    "IT2024SPRING": "B24IT",
    "AI2023FALL": "B23AI",
    "AI2024SPRING": "B24AI",
    "DS2023FALL": "B23DS",
    "DS2024SPRING": "B24DS",
    "SE2023FALL": "B23SE",
    "SE2024SPRING": "B24SE"
}

def generate_student_data(ssn, batch_prefix):
    students = []
    for i in range(1, 31):
        year = batch_prefix[1:3]
        dept = batch_prefix[3:5]
        roll = f"{i:03d}"
        enrollment = f"{year}1{dept}{roll}"
        name = f"Student {i}"
        submission_date = (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d")
        plagiarism_score = round(random.uniform(0.85, 0.99), 2)
        code_quality = random.randint(75, 95)
        correctness = random.randint(80, 98)
        complexity = random.randint(75, 95)
        readability = random.randint(80, 95)
        performance = random.randint(75, 95)
        test_coverage = random.randint(80, 95)
        error_handling = random.randint(75, 95)
        documentation = random.randint(75, 95)
        algorithm_efficiency = random.randint(80, 95)
        memory_usage = random.randint(75, 95)
        time_complexity = random.randint(75, 95)
        code_duplication = round(random.uniform(0.85, 0.98), 2)
        maintainability = random.randint(75, 95)
        security_score = random.randint(75, 95)
        optimization = random.randint(75, 95)
        style_guide_compliance = random.randint(80, 95)
        overall_score = round((
            code_quality + correctness + complexity + readability + 
            performance + test_coverage + error_handling + documentation + 
            algorithm_efficiency + memory_usage + time_complexity + 
            maintainability + security_score + optimization + style_guide_compliance
        ) / 15, 1)
        students.append({
            "student_name": name,
            "enrollment_number": enrollment,
            "submission_date": submission_date,
            "plagiarism_score": plagiarism_score,
            "code_quality": code_quality,
            "correctness": correctness,
            "complexity": complexity,
            "readability": readability,
            "performance": performance,
            "test_coverage": test_coverage,
            "error_handling": error_handling,
            "documentation": documentation,
            "algorithm_efficiency": algorithm_efficiency,
            "memory_usage": memory_usage,
            "time_complexity": time_complexity,
            "code_duplication": code_duplication,
            "maintainability": maintainability,
            "security_score": security_score,
            "optimization": optimization,
            "style_guide_compliance": style_guide_compliance,
            "overall_score": overall_score
        })
    return students

def create_structure():
    os.makedirs("data/Assignment", exist_ok=True)
    os.makedirs("data/report/assignment", exist_ok=True)
    for ssn, batch_prefix in SSN_KEYS.items():
        ssn_data_dir = os.path.join("data", "Assignment", ssn)
        os.makedirs(ssn_data_dir, exist_ok=True)
        students = generate_student_data(ssn, batch_prefix)
        for student in students:
            pdf_path = os.path.join(ssn_data_dir, f"{student['enrollment_number']}.pdf")
            with open(pdf_path, "w") as f:
                f.write(f"Assignment for {student['student_name']} ({student['enrollment_number']})\n")
                f.write(f"SSN: {ssn}\n")
                f.write(f"Submission Date: {student['submission_date']}\n")
                f.write("This is a placeholder for the actual assignment PDF.\n")
        df = pd.DataFrame(students)
        df.to_csv(os.path.join("data", "report", "assignment", f"{ssn}.csv"), index=False)
        print(f"Created structure for {ssn} with {len(students)} students")

if __name__ == "__main__":
    create_structure()
