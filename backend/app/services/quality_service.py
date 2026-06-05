import json
from pathlib import Path
from ..schemas.quality import QualityResponse

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
REPORT_PATH = PROJECT_ROOT / "data" / "quality_reports" / "data_quality_report.json"

def get_quality_report() -> QualityResponse:
    with open(REPORT_PATH, 'r') as f:
        data = json.load(f)
    return QualityResponse(**data)