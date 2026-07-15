from sqlalchemy import Column,Integer,String,Text,Date,DateTime
from sqlalchemy.sql import func
from app.database import Base
class Interaction(Base):
    __tablename__='interactions'
    id=Column(Integer,primary_key=True,index=True)
    hcp_name=Column(String)
    specialty=Column(String)
    hospital=Column(String)
    summary=Column(Text)
    products_discussed=Column(Text)
    objections=Column(Text)
    follow_up_date=Column(Date)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
