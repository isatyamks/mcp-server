from mcp.server.fastmcp import FastMCP
import pandas as pd
import os
from typing import List, Dict, Any

mcp = FastMCP("isatyamks")

def load_report(ssn: str) -> pd.DataFrame:
    try:
        ssn = ssn.upper()
        current_dir = os.path.dirname(os.path.abspath(__file__))
        report_dir = os.path.join(current_dir, "data", "report", "assignment")
        available_reports = [f.replace('.csv', '') for f in os.listdir(report_dir) if f.endswith('.csv')]
        if ssn not in available_reports:
            raise FileNotFoundError(
                f"Report for SSN {ssn} not found. Available SSNs are: {', '.join(available_reports)}"
            )
        report_path = os.path.join(report_dir, f"{ssn}.csv")
        if not os.path.exists(report_path):
            raise FileNotFoundError(f"Report file not found at: {report_path}")
        if not os.access(report_path, os.R_OK):
            raise PermissionError(f"Cannot read report file at: {report_path}")
        return pd.read_csv(report_path)
    except Exception as e:
        raise Exception(f"Error loading report for SSN {ssn}: {str(e)}")

@mcp.tool()
def get_topper(ssn: str, batch: str = None) -> Dict[str, Any]:
    try:
        df = load_report(ssn)
        if batch:
            df = df[df['enrollment_number'].str.startswith(batch)]
        if df.empty:
            return {"error": f"No students found in SSN {ssn}" + (f" for batch {batch}" if batch else "")}
        topper = df.loc[df['overall_score'].idxmax()]
        return {
            "name": topper['student_name'],
            "enrollment": topper['enrollment_number'],
            "score": topper['overall_score'],
            "ssn": ssn
        }
    except FileNotFoundError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@mcp.tool()
def get_batch_statistics(ssn: str, batch: str = None) -> Dict[str, Any]:
    try:
        df = load_report(ssn)
        if batch:
            df = df[df['enrollment_number'].str.startswith(batch)]
        if df.empty:
            return {"error": f"No students found in SSN {ssn}" + (f" for batch {batch}" if batch else "")}
        return {
            "ssn": ssn,
            "batch": batch if batch else "all",
            "average_score": df['overall_score'].mean(),
            "highest_score": df['overall_score'].max(),
            "lowest_score": df['overall_score'].min(),
            "total_students": len(df),
            "average_plagiarism": df['plagiarism_score'].mean(),
            "average_code_quality": df['code_quality'].mean()
        }
    except FileNotFoundError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@mcp.tool()
def get_student_details(ssn: str, enrollment: str) -> Dict[str, Any]:
    try:
        df = load_report(ssn)
        student = df[df['enrollment_number'] == enrollment]
        if student.empty:
            return {"error": f"Student {enrollment} not found in SSN {ssn}"}
        student_data = student.iloc[0]
        return {
            "name": student_data['student_name'],
            "enrollment": student_data['enrollment_number'],
            "ssn": ssn,
            "submission_date": student_data['submission_date'],
            "overall_score": student_data['overall_score'],
            "plagiarism_score": student_data['plagiarism_score'],
            "code_quality": student_data['code_quality'],
            "correctness": student_data['correctness'],
            "complexity": student_data['complexity'],
            "readability": student_data['readability']
        }
    except FileNotFoundError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@mcp.tool()
def compare_ssn_performance(ssn1: str, ssn2: str) -> Dict[str, Any]:
    try:
        df1 = load_report(ssn1)
        df2 = load_report(ssn2)
        return {
            "ssn1": {
                "ssn": ssn1,
                "average_score": df1['overall_score'].mean(),
                "total_students": len(df1),
                "average_plagiarism": df1['plagiarism_score'].mean()
            },
            "ssn2": {
                "ssn": ssn2,
                "average_score": df2['overall_score'].mean(),
                "total_students": len(df2),
                "average_plagiarism": df2['plagiarism_score'].mean()
            },
            "comparison": {
                "score_difference": df1['overall_score'].mean() - df2['overall_score'].mean(),
                "plagiarism_difference": df1['plagiarism_score'].mean() - df2['plagiarism_score'].mean()
            }
        }
    except FileNotFoundError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
