"""empty message

Revision ID: d92a7d1e9a49
Revises: 6e3dd73c71d4
Create Date: 2024-10-11 19:43:33.391341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd92a7d1e9a49'
down_revision = '6e3dd73c71d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('period', sa.DateTime(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('vouchers', sa.LargeBinary(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('applications_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['applications_id'], ['applications.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('expenses')
    op.drop_table('history')
    # ### end Alembic commands ###
