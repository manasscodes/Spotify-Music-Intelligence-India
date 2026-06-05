from pydantic import BaseModel
from typing import List, Optional

class QualityScore(BaseModel):
    completeness_score: float
    uniqueness_score: float
    validity_score: float
    overall_health_score: float
    row_count: int
    column_count: int
    duplicate_rows: int
    missing_cells: int

class QualityResponse(BaseModel):
    indian_dataset: QualityScore
    global_dataset: QualityScore
    strategic_notes: List[str]